const {db} = require('../util/admin');
//
const functions = require('firebase-functions');

exports.getAllScreams= (req,res)=>
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
}

exports.postOneScream =  (req,res)=>{
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
  
  }

  // // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
 

 /*
 this method will be post, and 
 //body sample 
//  {
// 	"body":"postman scream",
// 	"userHandle":"postman userHandle"
/}
*/

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