const {db} = require('../util/admin');
//
const functions = require('firebase-functions');
const {validateDeleteScream}= require('../util/validators');

exports.getAllScreams= (req,res)=>
{
  const EventEmitter = require('events');
  EventEmitter.defaultMaxListeners = 30;

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();
  // increase the limit
  myEmitter.setMaxListeners(1000);
  let count =1;
  let ccount=1;
  db
  .collection("screams")
  .orderBy('createdAt','desc')
  .get()
  .then(data=> {
    let screams =[];
    let comments=[];
    let likes=[];
    data.forEach((doc) => {
      let id_= doc.id;
      // MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 close listeners added. Use emitter.setMaxListeners() to increase limit hatası veriyor ??
       ccount = 1;
      screams.push({
        sno:count++,
        screamId:id_,
        likeCount:doc.data().likeCount,
        commentCount:doc.data().commentCount,
        body:doc.data().body,
        userHandle:doc.data().userHandle,
        createdAt:doc.data().createdAt,
        userImage:doc.data().userImage
        //,comments: db
        // .collection('comments')
        // .where('screamId','==',id_)
        // .get()
        // .then(datac=>{
        //   datac.forEach((docc)=>{
        //     comments.push({
        //       sno:ccount++,
        //       body:docc.data().body,
        //       createdAt:docc.data().createdAt
        //     })
        //   }) ;
        //   //ccount=1;
        //   return datac.json(comments);
        // })
        //  ,likes: await db
        //  .collection('likes')
        //  .where('screamId','==',id_)
        //  .get()
        //  .then(datac=>{
        //    datac.forEach((docc)=>{
        //      likes.push({    
        //        sno:ccount++,          
        //        userHandle:docc.data().userHandle,
        //        createdAt:docc.data().createdAt
        //      })
        //    }) ;
        //    return datac.json(likes);
        //  })
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
  if(req.body.body.trim()==='') 
    return res.status(400)
    .json({comment:'must not be empty'});

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
exports.deleteScream = (req, res) => {
  const document = db.doc(`/screams/${req.params.screamId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' });
      }
      console.log('doc.data().userHandle: '+ doc.data().userHandle + 
      ' req.user.handle: ' + req.user.handle);
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Scream deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};