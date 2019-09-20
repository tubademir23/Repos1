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

exports.getScream = (req, res)=>{
  let screamData={};
  db.doc(`/screams/${req.params.screamId}`).get().then(doc=>{
    if(!doc.exists){
      res.status(404).json({error:'screamid not found'});
      console.error(err);
    }
    screamData = doc.data();
    screamData.screamId = doc.id;
    return db.collection('comments')
    .where('screamID','==', req.params.screamId).get();    
  })
  .then(data=>{
    screamData.comments = [];
    data.forEach(doc=>{
      screamData.push(doc.data())
    });
    return res.json(screamData);
  })
  .catch(err=>{
    console.error(err);
    res.status(500).json({error: err.code});
  })
}


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