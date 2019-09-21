const {db} = require('../util/admin');

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
    const regExpswrd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
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

exports.validateSignupData = (data)=>{
  let errors={};
    const emailMsg= isEmail(data.email);
    if(emailMsg!=="successful"){
      errors.email=emailMsg;
    }
  
    const pswrdMsg= isPassword(data.password, data.confirmPassword);
    if(pswrdMsg!=="successful")
      errors.password=pswrdMsg;
  
    if(isEmpty(data.handle)) errors.handle ='must not be empty';
  
    // if(Object.keys(errors).length>0){
    //   return res.status(400).json(errors);
    // }
    return {
        errors, 
        valid:Object.keys(errors).length === 0 ? true : false
    }
}

 exports.validateDeleteScream=(id_, userHandle)=>{
  
    const screamDocument=db.doc(`/screams/${id_}`);
    screamDocument.get()
    .then(doc=>{
    if(doc.data().userHandle!==userHandle){
       console.log('unauthorizedscream not belong to this auth user');
      errors.authscream ='unauthorizedscream not belong to this auth user';
    }
    const likeDocument= db
      .collection('likes')
      .where('screamId','==', id_);
      likeDocument.get()
      .then(doc=>{
        if(doc!==NaN && doc!==null && doc!==undefined && doc.size >0){
          // console.log('have likes for this scream');
           errors.likes='have likes for this scream';
        }
      });
    const commentDocument= db
      .collection('comments')
      .where('screamId','==', id_)
      .get()
      .then(doc=>{
        if(doc!==Nan && doc!==undefined && doc.size >0){
          // console.log('have comments for this scream');
           errors.comments='have comments for this scream';
        }
      });
      return {
        valid : Object.keys(errors).length === 0 ? true : false,
        errors,
        screamDocument
       }
     })
    .catch(err=>{
      console.log("catch");
      errors.catcherr=err;
      return {
        valid:false,
        errors,
        
        screamDocument
      };
     });
}


exports.validateLoginData = (data)=>{
    let errors={};
    if(isEmpty(data.email)) errors.email ='must not be empty';
    if(isEmpty(data.password)) errors.password ='must not be empty';
    return {
        errors, 
        valid:Object.keys(errors).length === 0 ? true : false
    }
}

exports.reduceUserDetails = (data) =>{
  const regExWeb = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  let userDetails = {};
  let errors={};
  // userId:'2vGW6Pek1cNlKla90VVgFeluXQe2',
  //           email:'new566@gmail.com',
  //           handle:'new566',
  //           createdAt:'2019-09-17T08:16:23.420Z',
  //           imageUrl:'18469778006.jpg',
  //           bio:'hi ia m here',
  //           website:'https://user.com',
  //           location:'London, UK'

  if(!isEmpty(data.bio.trim())) {
    userDetails.bio = data.bio;
  }else errors.bio='bio empty';
  if(!isEmpty(data.website.trim()))
  {
    if(data.website.trim().match(regExWeb)){
      userDetails.website = data.website;
    }else{
      errors.website='website does not match';
    } 
  }else{
   errors.website='website empty';
  }
  if(!isEmpty(data.location.trim())){ 
    userDetails.location = data.location;
  }
  else{ 
    errors.location='location empty';
  }
  
  return userDetails;
}