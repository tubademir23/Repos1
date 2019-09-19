const {db}=require('../util/admin');

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