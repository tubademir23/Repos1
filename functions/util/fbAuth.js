//we will start iddleware
//middleware for 3 parameters with next
//here headers Authorization 's value is equal 2 token,
//take token from sign ops.

const {admin, db}=require('./admin');

module.exports = (req, res, next) =>{
    if(req.headers.authorization ){
      //{token} so token equals body authorization text
     // console.log("req-uth--- "+req.headers.authorization);
      idtoken = req.headers.authorization;
    //  console.log("idtoken: "+idtoken);
    }else{
      
      return res.status(403).json({error:'unauthorized'})
    }
    admin.auth().verifyIdToken(idtoken)
    .then(decodedToken=>{
      req.user=decodedToken;
      //console.log(decodedToken);
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