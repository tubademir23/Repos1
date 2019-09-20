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
exports.validateLoginData = (data)=>{
    let errors={};
    if(isEmpty(data.email)) errors.email ='must not be empty';
    if(isEmpty(data.password)) errors.password ='must not be empty';
    return {
        errors, 
        valid:Object.keys(errors).length === 0 ? true : false
    }
}
