// const firebase = require('firebase');
const config = require('./util/config');
// firebase.initializeApp(config);
const functions = require('firebase-functions');
const FBAuth = require('./util/fbAuth');
const app = require('express')(); 
const {db} = require('./util/admin');


// myEmitter.setMaxListeners(1023);

const{getAllScreams, 
    postOneScream, 
    getScream,
    commentOnScream,
    deleteScream, 
    likeScream, 
    unlikeScream} = require('./handlers/screams');
    
const{signup, 
    login, 
    uploadImage, 
    addUserDetails, 
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead} = require('./handlers/users');

//scream routers
app.get('/screams', getAllScreams);
app.post('/screams', FBAuth,postOneScream);
//send parameter :8u7p2whHpEOcwZlCiAa4 ----
app.get('/scream/:screamId', getScream);
//TODO: delete scream
app.delete('/scream/:screamId',FBAuth, deleteScream);
//TODO: like a scream
app.get('/scream/:screamId/like',FBAuth, likeScream);
//TODO: unlike a scream
app.get('/scream/:screamId/unlike',FBAuth, unlikeScream);
//TODO: comment on scream
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);


//user routes
app.post('/signup',signup);
//gcloud auth application-default login necessary command
app.post('/login',login);

//fbauth for auth need
app.post('/user/image',FBAuth, uploadImage);
app.post('/user',FBAuth, addUserDetails);
app.get('/user',FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.region('europe-west1').https.onRequest(app);

exports.createNotificationOnLike = functions
  .region('europe-west1')
  .firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            screamId: doc.id
          });
        }
      })
      .catch((err) => console.error(err));
  });
exports.deleteNotificationOnUnlike=functions
.region('europe-west1')
.firestore.document('/likes/{id}')
.onDelete((snapshot)=>{
    return db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .catch(err=>{
        console.error(err);
        return ;
    })
});

exports.deleteLikesOnDeleteScreams=functions
.region('europe-west1')
.firestore.document('/screamss/{id}')
.onDelete((snapshot)=>{
    
    // const snapshot = firestore.collection('like')
    //                 .where('screamId','==', snapshot.data().screamId)
    //                 .get();
    firestore.document('/screams/{id}')
    .onDelete((snapshot)=>{
        
        console.log('id');
        return '/screams/ ';
        // const screamDocument=db.doc(`/screams/${id_}`);
    
        // const likeDocument= db
        // .collection('likes')
        // .where('screamId','==', id_)
        // db.document('likes')
        // .where('screamId','==',snapshot.id)
        // .delete()
        // .then(()=>{
            
        //    return res.json({ message: 'likes deleted successfully' });
        // })
        // .catch(err=>{
        //     console.error(err);
        //     return res.status(403).json({ error: err.code });
        // })
    })
})


exports.createNotificationOnComment=functions
.region('europe-west1')
.firestore.document('/comments/{id}')
.onCreate((snapshot)=>{
    return db.doc(`/screams/${snapshot.data().screamId}`).get()
    .then(doc=>{
        if(doc.exists){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt:new Date().toISOString(),
                recipient:doc.data().userHandle,
                sender:snapshot.data().userHandle,
                type:'comment',
                read:false,
                screamId: doc.id
            })
        }
    })
    .catch(err=>{
        console.error(err);
        return ;
    })
});
//change after, before
//only change image, bot other infos
exports.onUserImageChange =functions.region('europe-west1')
.firestore.document('/users/{userId}')
.onUpdate((snapshot)=>{
    console.log(change.before.data());
    console.log(change.after.data());
    if(change.before.data().imageUrl1==change.after.data().imageUrl){
        let batch =db.batch();
        return db.collection('screams')
        .where('userHandle', '==',change.before.data().handle)
        .get()
        .then((data)=>{
            data.forEach(doc=>{
                const screamId = db.doc(`/screams/${doc.id}`);
                batch.update(scream,{userImage:change.after.data().imageUrl});
            })
            return batch.commit();
        });
    }else return true;
});
exports.onScreamDelete = functions
  .region('europe-west1')
  .firestore.document('/screams/{screamId}')
  .onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db
      .collection('comments')
      .where('screamId', '==', screamId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db
          .collection('likes')
          .where('screamId', '==', screamId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection('notifications')
          .where('screamId', '==', screamId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });