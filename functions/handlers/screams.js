const {db} = require('../util/admin');
//
const functions = require('firebase-functions');
const {validateDeleteScream}= require('../util/validators');

exports.getAllScreams= (req,res)=>
{
  let count =1;
  let ccount=1;
  db
  .collection("screams")
  .orderBy('createdAt','desc')
  .get()
  .then(data=> {
    let screams =[];
    
    data.forEach((doc) => {
      let id_= doc.id;
      let comments=[];
      
      screams.push({
        sno:count++,
        screamId:id_,
        likeCount:doc.data().likeCount,
        body:doc.data().body,
        userHandle:doc.data().userHandle,
        createdAt:doc.data().createdAt,
        comments: db
        .collection('comments')
        .where('screamId','==',id_)
        .get()
        .then(datac=>{
          datac.forEach((docc)=>{
            comments.push({
              
              body:docc.data().body,
              createdAt:docc.data().createdAt
            })
          }) ;
          return datac.json(comments);
        })
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
    if(!data.empty){
      db.doc(`/likes/${data.docs[0].id}`)
      .delete()
      .then(()=>{
        screamData.likeCount--;
        return screamDocument.update({ likeCount: screamData.likeCount })
      })
      .then(()=>{      
        return res.json(screamData);
      });
    }
    else{
      return res.status(400).json({error:'scream not liked by this user'});
    }
  })
  .catch((err)=>{
    console.error(err);
    return res.status(500).json({error:err.code});
  });
}
const isExistsScream =(id_)=>{
  screamDocument.get()
  .then(doc=>{
    if(!doc.exists){
      console.log(id_);
      return false;
    }else{
      return true;
    }
  });
  return true;
};
exports.deleteScream= (req,res)=>
{
  let errors='';
  let id_= `${req.params.screamId}`;
  const screamDocument=db.doc(`/screams/${id_}`);
  screamDocument.get()
  .then(doc=>{
    if(!doc.exists){
      errors='scream not found';
      return res.status(404).json({errors});
    }
    if(doc.data().userHandle!==req.user.handle){
      errors='unauthorizedscream not belong to this auth user';
      return res.status(403).json({errors});
    }
  })
  .then(()=>{
    console.log("err"+errors+".");
    if(errors==='' || errors===undefined){
      db.collection("likes").where('screamId','==', id_).get()
      .then(data=> {       
        data.forEach((doc) => {          
          Promise.doc.delete();
        })
      })
      /*db
      .collection("likes")
      .where('screamId','==', id_)
      .get()
      .then(data=> {       
        data.forEach((doc) => {          
          doc.delete();
        });
        return;
        // return res.status(200).json({message:'likes deleted successfully'});
      })
      .catch(err=> console.error(err));
      */
      db
      .collection("comments")
      .where('screamId','==', id_)
      .get()
      .then(data=> {
        data.forEach((doc) => {
          doc.delete();
        });
        return res.status(200).json({message:'comments deleted successfully'});
      })
      .catch(err=> console.error(err));

      if(errors!=='' ){
        return res.status(403).json({
            errors
          })
      }else{
        console.log("err"+errors+"...");
        return screamDocument.delete();
        return res.json({message:'screamed deleted successfully'});
      }
    }    
  })
  .catch(err=>{
    console.error(err);
    return res.status(400).json(error=>err.code);
  })
}