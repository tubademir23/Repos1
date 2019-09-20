const {admin, db}=require('../util/admin');

const firebase=require('firebase');

const config = require('../util/config');

const {validateSignupData, validateLoginData}= require('../util/validators');

firebase.initializeApp(config);


//signup route
exports.signup = (req,res)=>{
    const newUser={
      email:req.body.email,
      password:req.body.password,
      confirmPassword:req.body.confirmPassword,
      handle:req.body.handle
  
    };
  //here take validators method
    // TODO: validate data 

    //definiton: const {validateSignupData, validateLoginData}= require('../util/validators');
    const {valid, errors} = validateSignupData(newUser);
    if(!valid){
        return res.status(403).json({
            errors
          })
    }

    //after validation add image2profile
    //when want to go imageurl access will be denied so, firebase storage ;
    //allow read; and publish
    const noImg='no-img.png';
    let token, userId;
    db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc=>{
      if(doc.exists){
        return res.status(400).json({
          handle:'this handle is already taken'
        })
      }else{
        return firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
  
    })
    .then(data =>{
      userId= data.user.uid;
     //console.log("token:"+userId_);
      return data.user.getIdToken();
    
    })
    .then(idtoken=>{
      console.log(token);
      token=idtoken;
      const userCredentials={
        handle:newUser.handle,
        email:newUser.email,
        createdAt:new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${noImg}?alt=media`,
        userId
      };
      return db.doc(`/users/${newUser.handle}`)
      .set(userCredentials);
     // return res.status(201).json({token});
    })
    .then(()=>{
      return res.status(201).json({token});
    })
    .catch((err) =>{
      console.error(err);
      if(err.code=== 'auth/email-already-in-use'){
        return res.status(400).json({email:'local message: email is already use'});
      }else{
        console.log("err:"+err);
        return res.status(500).json({error:err.code});
      }
    })
  
  //   firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(newUser.email, newUser.password)
  //   .then(data=>{
  //     return res.status(201).json({message: ` user ${data.user.uid} signed up successfully`});
  //   })
  //   .catch(err =>{
  //     console.error(err);
  //     return res.status(500).json({error:err.code});
  //   })
  }

  exports.uploadImage = (req, res)=>{
      const BusBoy = require('busboy');
      const path=require('path');
      const os = require('os');
      const fs= require('fs');
      const busboy = new BusBoy({
        headers: req.headers
      });

      let imageFileName;
      let imageToBeUploaded = {};
      let imageUrl;

      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname);
        console.log(filename);
        console.log(mimetype);

        //t.i.png, last split index is extension
        const imageExtension =  filename.split('.')[filename.split('.').length-1];
        // 6454566546676.png
        console.log(`deneme: ${Math.round(Math.random()*100000000000)}.${imageExtension}`);
        imageFileName = `${Math.round(Math.random()*100000000000)}.${imageExtension}`;
        const filepath= path.join(os.tmpdir(), imageFileName);

        imageToBeUploaded = {filepath, mimetype};

        file.pipe(fs.createWriteStream(filepath));

      });
      busboy.on('finish',() =>{
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
          resumable:false,
          metadata: {
            metadata :{
              contentType: imageToBeUploaded.mimetype
            }
          }
        })
        .then(()=>{
          //alt=media make authorized http get file url and download file
          imageUrl =`https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
          console.log(imageUrl);
          return db.doc(`/users/${req.user.handle}`).update({imageUrl});
        })
        .then((data)=>{
          return res.json({message: imageUrl+' image uploaded successfully'});
        })
        .catch(err=>{
          console.error(err);
          return res.status(500).json({error:err.code});
        })
      });
      busboy.end(req.rawBody);
  };


  exports.login =(req,res)=>{
    const user={
      email:req.body.email,
      password:req.body.password
    };
    
    const {valid, errors} = validateLoginData(user);
    if(!valid){
        return res.status(403).json({
            errors
          })
    }


    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data=>{
      // data.user.getIdToken()
      return data.user.getIdToken();
    })
    .then(token =>{
      console.log(token);
      return res.json(token);
    })
    .catch(err=>{
      if(err.code==='auth/wrong-password'){
        return res.status(403).json({general:'wrong credentials, please control'});
      }else {
        return res.status(500).json({
          error:err.code
        });
      }
    })
    
  }