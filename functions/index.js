const functions = require('firebase-functions');



const app = require('express')(); 

const firebaseConfig = {
  apiKey: "AIzaSyBNdhVdXEoOxUSA7TdrnleKLY6VzrPDuu8",
  authDomain: "socialape-c5980.firebaseapp.com",
  databaseURL: "https://socialape-c5980.firebaseio.com",
  projectId: "socialape-c5980",
  storageBucket: "socialape-c5980.appspot.com",
  messagingSenderId: "986397577977",
  appId: "1:986397577977:web:cb7eb1197cebb3422f4828"
};
let defaultAppConfig = {
    credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "socialape-c5980",
    "private_key_id": "6add7684f9a665fee9f4c389071f92652dbd23ce",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpTTfoUaRr+SIa\nf/4DmsCTJKwjZs6wKx49pErPJfyP5MjUUD+GwqT+bBMYLTnKuhEtXtApNOMGxyit\nEybqTjoEGrxRdC4pwPmxYapXBhfFaxfEVnj+PW6rxWuIdYBXBJAOnSQKjwahPV4e\n/ZBmArh0WIkA+iQWr2Cnvigii9Kje3f01mtQGjuJMxv2csRJLv12MvE8nk612kpV\nqzI4z/Cv2H3rdPqQ7i7GfhOIgjDmQAG5hQgxuW4+CoocRMIhWMmWuJYYhCAzmIGm\n0dFu2VctTC5W53I/sWrVJya8McJag4xVjpHMpeo8tZVj9tuvYvjUA4wOVlHjqv/Y\n8ZjnK5z3AgMBAAECggEAHONCo17u5ceMRKZLQvUwX8sVnjLIGLI6xjzW0PLD3g+l\nHukUdduXiJwLRAhPgKJwFORFM4rFJB5ud925OaigaJvhPyrKR7CYSmaGSLQO8U4d\nL5Crs4Hq9N9KQm3+OJrcM8onYK/X60JL4ZDVhzp2m8+RjPuhlcdWADlHouFlzyQW\nn4Tas8bEWzB82zsrgzAZua4hDrbOwEf3Vyz0BvW5d7+ms3+K31YscIIT7xawIpTC\nyS3S8qwBM51CKy2Y4yyP+aH/TjCOcNsoa4s8gBI8yKoAfEaY2VKhR8ygLehs80Ik\n+e6qZ194hx69gf5WuN3lRbPWmNIDK+m22X2m2u9fdQKBgQDQb5l9idQv/xOoCvZw\n1/VM4eXcW3jcHWRKWnEEgUr8FHqQiWKqzXIe9188rGbmdm/tUl/58rYDCINOnSTX\n9rQk13IZk7aHFntmnpZ+kKnR9eHtM8Nhwn9lSoyn7qGF0hp+eyKy1HkgtD11aBim\neC9juZJvOl989ndr8wO4RNLIWwKBgQDP73kb9T03gaIXFYcjJDjynnIskNdNsK05\n7ngcV9gXv4YGfkIx79mbeX03ds177NJq9l8qmV9tpPu6W+6i3zByeEj4wRswzd4c\nAw3qIyI2IplOsekfrinwJkzjit+8P4pBQeq/S9QaNKQE6Fr1NrrAHehX7xEf21YP\nVQFuegcAlQKBgHLNBL0gLL5Cv5DOeO2uBG1T/kZgGzEg/xv0tErG64XrwZXaFX39\nqd1kYhAI5KQKl5sew73m8Fi7V5b09lX8izu/bhioQuAkgdMDheAvzVjXFJiQ6gvu\nFDy10sKrrEsIbY88QuA8JnrcyvzfWLRXfcJvczfP7sfk9+F894+GWJIBAoGAVom4\nop0W5CHsXqUT/9kUZkzxAYEqSegMv/5yOIGKqp+H3O3xCK1kqCMQrOOhs0CldeSh\nSK5aG9y88xtNnrU6iXlsDTL46P/Uv126Dcafd15A5ZJ/jjLCu3KFL3HdmY/sLyqK\n0yBw3pMn6+7z4/fqEwifaPFS9Copj+n11Y+tmF0CgYEAv6mSpEGf7YVp5CcD2zCr\n4U0uVaO2HazpP/PawImnPDVA/YuFYLmeDBlEbV9PkR41rjYtzU+DtcwbVb53e07p\nLd9fq0mEXHb7A5XyGVA5fYYj9YEKw+w4Jm+5AQNXD4cY+xrjVPbxxxy5UaWAjG5d\nAXPMtazl9frye+afkDI2Wq4=\n-----END PRIVATE KEY-----\n",
    "client_email": "project-986397577977@project-986397577977.iam.gserviceaccount.com",
    "client_id": "109257776193164148662",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/project-986397577977%40project-986397577977.iam.gserviceaccount.com"
  }),
  //databaseURL: 'https://socialape-c5980.firebaseio.com/'
    databaseURL:'https://console.firebase.google.com/project/socialape-c5980/database/firestore/data~2Fscreams~2F5GKdreQIsWqMRSTMtg1y'
}

const firebase=require('firebase');
firebase.initializeApp(firebaseConfig);




app.get('/screams', (req,res)=>
{
  let count =1;
  db
  .collection("screams")
  .orderBy('createdAt','desc')
  .get()
  .then(data=> {
    let screams =[];
    data.forEach((doc) => {
        screams.push({
          sno:count++,
          screamId:doc.id,
          body:doc.data().body,
          userHandle:doc.data().userHandle,
          createdAt:doc.data().createdAt
        });
    });
    return res.json(screams);
  })
  .catch(err=> console.error(err));
})

//we will start iddleware
//middleware for 3 parameters with next
//here headers Authorization 's value is equal 2 token,
//take token from sign ops.

const FBAuth=(req, res, next) =>{
  if(req.headers.authorization ){
    //bearer {token}
   // console.log("req-uth--- "+req.headers.authorization);
    idtoken = req.headers.authorization;
  //  console.log("idtoken: "+idtoken);
  }else{
    console.error('no token found')
    return res.status(403).json({error:'unauthorized'})
  }
  admin.auth().verifyIdToken(idtoken)
  .then(decodedToken=>{
    req.user=decodedToken;
    console.log(decodedToken);
    return db.collection('users')
    .where('userId','==',req.user.uid)
    .limit(1)
    .get();
  })
  .then(data=>{
    //limit 1 so array index 0, get prop handle
    req.user.handle=data.docs[0].data().handle;
    return next();
  })
  .catch(err=>{
    console.error("error while verifying token", err);
    res.status(403).json({err});
    
  });
}
app.post('/screams', FBAuth, (req,res)=>{
  //new object
  //method post unnecessary post method automatcically
  if(req.body.body.trim()===''){
    return res.status(400).json({error:'body must not be empty'})
  }

  const newScream={
    body:req.body.body,
    userHandle:req.user.handle, // here is important that we will take handle from the user
    createdAt:new Date().toISOString()
  };

  db
  .collection('screams')
  .add(newScream )
  .then( (doc) => {
    res.json({message: doc.id +' created'});
  })
  .catch(err=>{
    res.status(500).json({error:'sth gone wrond'});
    console.error(err);
  });

})


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 
 exports.getScreams= functions.https.onRequest((req, res) =>{
    db
    .collection("screams")
    .get()
    .then(data=> {
        let screams =[];
        data
        .forEach(element => {
            screams
            .push(element.data());
        });
        return res.json(screams);
    })
    .catch(err=> console.error(err));
 })

 /*
 this method will be post, and 
 //body sample 
//  {
// 	"body":"postman scream",
// 	"userHandle":"postman userHandle"
/}
*/

const isEmpty = (string)=>{
  if(string.trim()==='') return true;
  else return false;
}

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(isEmpty(email)){
    return "email must not be empty"
  }
  else if (!email.match(regEx)){ return "email must be regex";}
  else return "successful";
};
//"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
const isPassword = (password, confirmPassword) => {
  const regExpswrd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if(isEmpty(password) ){
    return 'password must not be empty'
  }
  else if(isEmpty(confirmPassword) ){
    return 'confirmPassword must not be empty'
  }
  else if(password !== confirmPassword){
    return 'password and confirm password must be match'
  }
  else if(!password.match(regExpswrd)){
    return 'password must be et least one uppercase, one lowercase, one number and eight characters'
  }
  else return 'successful';
};

//signup route
app
.post('/signup',(req,res)=>{
  const newUser={
    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword,
    handle:req.body.handle

  };

  let errors={};
  const emailMsg= isEmail(newUser.email);
  if(emailMsg!=="successful"){
    errors.email=emailMsg;
  }

  const pswrdMsg= isPassword(newUser.password, newUser.confirmPassword);
  if(pswrdMsg!=="successful")
    errors.password=pswrdMsg;

  if(isEmpty(newUser.handle)) errors.handle ='must not be empty';

  if(Object.keys(errors).length>0){
    return res.status(400).json(errors);
  }
  // TODO: validate data 
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
})

//https://baseurl.com/api/
//gcloud auth application-default login necessary command
app.post('/login',(req,res)=>{
  const user={
    email:req.body.email,
    password:req.body.password
  };
  let errors={};
  if(isEmpty(user.email)) errors.email ='must not be empty';
  if(isEmpty(user.password)) errors.password ='must not be empty';

  if(Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
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
  
})
exports.api = functions.region('europe-west1').https.onRequest(app);