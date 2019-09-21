// const firebase = require('firebase');
const config = require('./util/config');
// firebase.initializeApp(config);
const functions = require('firebase-functions');
const FBAuth = require('./util/fbAuth');
const app = require('express')(); 

const{getAllScreams, postOneScream, getScream,commentOnScream,likeScream, unlikeScream} = require('./handlers/screams');
const{signup, login, uploadImage, addUserDetails, getAuthenticatedUser} = require('./handlers/users');

//scream routers
app.get('/screams', getAllScreams);
app.post('/screams', FBAuth,postOneScream);
//send parameter :8u7p2whHpEOcwZlCiAa4 ----
app.get('/scream/:screamId', getScream);
//TODO: delete scream
// app.get('/scream/:screamId/like',FBAuth, deleteScream);
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