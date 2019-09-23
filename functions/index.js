// const firebase = require('firebase');
const config = require('./util/config');
// firebase.initializeApp(config);
const functions = require('firebase-functions');
const FBAuth = require('./util/fbAuth');
const app = require('express')(); 
const {db} = require('./util/admin');

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
    getAuthenticatedUser} = require('./handlers/users');

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

exports.api = functions.region('europe-west1').https.onRequest(app);

exports.createNotificationOnLike = functions
  .region('europe-west1')
  .firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    //   console.log('create notifications');
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
    db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .then(()=>{
        
        return;
    })
    .catch(err=>{
        console.error(err);
        return ;
    })
});
exports.createNotificationOnComment=functions
.region('europe-west1')
.firestore.document('/comments/{id}')
.onCreate((snapshot)=>{
    db.doc(`/screams/${snapshot.data().screamId}`).get()
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
    .then(()=>{
        return;
    })
    .catch(err=>{
        console.error(err);
        return ;
    })
});
