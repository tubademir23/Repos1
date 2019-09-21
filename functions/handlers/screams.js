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
    userImage: req.user.imageUrl,
    createdAt:new Date().toISOString(),
    likeCount:0,
    commentCount:0
  };

  db
  .collection('screams')
  .add(newScream )
  .then( (doc) => {
    const resScream=newScream;
    resScream.screamId=doc.id;

    res.json({message: doc.id +' created'});
  })
  .catch(err=>{
    res.status(500).json({error:'sth gone wrond'});
    console.error(err);
  });

}
//fetch one scream
exports.getScream = (req, res)=>{
  let screamData={};
  let id_= `${req.params.screamId}`;
  db.doc(`/screams/${id_}`).get()
  .then(doc=>{
    if(!doc.exists){
      return res.status(404).json({error:'scream not found'});
    }
    screamData = doc.data();
    screamData.screamId = id_;
    //between then the value lose
    screamData.comments = [];
  });
//complex firebase query we need index
  const refComments= db
    .collection('comments')
    .orderBy('createdAt','desc')
    .where('screamId','==', id_)
    .get();

  refComments.then((data)=>{
      
      data.forEach(doc=>{
    //  console.log("data:"+doc.data());
      screamData.comments.push(doc.data())
    });
    return res.json(screamData);
  })
  .catch(err=>{
    console.error(err);
    res.status(500).json({error: err.code});
  })
}
//comment on a comment=
exports.commentOnScream = (req, res)=>{
  if(req.body.body.trim()==='') return res.status(400)
  .json({error:'must not be empty'});

  const newComment={
    body: req.body.body,
    createdAt: new Date().toISOString(),
    userHandle : req.user.handle,
    userImage : req.user.imageUrl,
    screamId : req.params.screamId
  };

  let id_= `${req.params.screamId}`;
  db.doc(`/screams/${id_}`).get()
  .then(doc=>{
    if(!doc.exists){
      return res.status(404).json({error:'comments scream not found'});
    }
    return db.collection('comments').add(newComment);
  })
  .then((sonuc)=>{
    console.log(sonuc);
    res.json(newComment);
  })
  .catch(err=>{
    console.log(err);
    return res.status(500).json({error:'sth went wrong when adding comment'+err.code});
  });
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

 exports.likeScream= (req,res)=>
{
  let screamData={};
  let id_= `${req.params.screamId}`;
  const screamDocument=db.doc(`/screams/${id_}`);

  const likeDocument= db
  .collection('likes')
  .where('screamId','==', id_)
  .where('userHandle','==', req.user.handle)
  .limit(1);

  screamDocument.get()
  .then(doc=>{
    if(!doc.exists){
      return res.status(404).json({error:'scream not found'});
    }
    screamData = doc.data();
    screamData.screamId = id_;
    if(isNaN(screamData.likeCount) || screamData.likeCount ==undefined){
       screamData.likeCount=0;
    }
    
    return likeDocument.get();
  })
  .then((data)=>{
    if(data.empty){
      db.collection('likes')
      .add({
        screamId:id_,
        userHandle:req.user.handle,
        createdAt : new Date().toISOString()
      })
      .then(()=>{
        screamData.likeCount++;
        return screamDocument.update({ likeCount: screamData.likeCount })
      })
      .then(()=>{      
        return res.json(screamData);
      });
    }
    else{
      return res.status(400).json({error:'scream already liked by this user'});
    }
  })
  .catch((err)=>{
    console.error(err);
    return res.status(500).json({error:err.code});
  });
}
exports.unlikeScream= (req,res)=>
{}
