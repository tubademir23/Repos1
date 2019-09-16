const functions = require('firebase-functions');

const admin = require('firebase-admin');
//deneme github 
// const request = require('request-promise');
defaultApp = admin.initializeApp();

let defaultAppConfig = {
    credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "socialape-c5980",
    "private_key_id": "6add7684f9a665fee9f4c389071f92652dbd23ce",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpTTfoUaRr+SIa\nf/4DmsCTJKwjZs6wKx49pErPJfyP5MjUUD+GwqT+bBMYLTnKuhEtXtApNOMGxyit\nEybqTjoEGrxRdC4pwPmxYapXBhfFaxfEVnj+PW6rxWuIdYBXBJAOnSQKjwahPV4e\n/ZBmArh0WIkA+iQWr2Cnvigii9Kje3f01mtQGjuJMxv2csRJLv12MvE8nk612kpV\nqzI4z/Cv2H3rdPqQ7i7GfhOIgjDmQAG5hQgxuW4+CoocRMIhWMmWuJYYhCAzmIGm\n0dFu2VctTC5W53I/sWrVJya8McJag4xVjpHMpeo8tZVj9tuvYvjUA4wOVlHjqv/Y\n8ZjnK5z3AgMBAAECggEAHONCo17u5ceMRKZLQvUwX8sVnjLIGLI6xjzW0PLD3g+l\nHukUdduXiJwLRAhPgKJwFORFM4rFJB5ud925OaigaJvhPyrKR7CYSmaGSLQO8U4d\nL5Crs4Hq9N9KQm3+OJrcM8onYK/X60JL4ZDVhzp2m8+RjPuhlcdWADlHouFlzyQW\nn4Tas8bEWzB82zsrgzAZua4hDrbOwEf3Vyz0BvW5d7+ms3+K31YscIIT7xawIpTC\nyS3S8qwBM51CKy2Y4yyP+aH/TjCOcNsoa4s8gBI8yKoAfEaY2VKhR8ygLehs80Ik\n+e6qZ194hx69gf5WuN3lRbPWmNIDK+m22X2m2u9fdQKBgQDQb5l9idQv/xOoCvZw\n1/VM4eXcW3jcHWRKWnEEgUr8FHqQiWKqzXIe9188rGbmdm/tUl/58rYDCINOnSTX\n9rQk13IZk7aHFntmnpZ+kKnR9eHtM8Nhwn9lSoyn7qGF0hp+eyKy1HkgtD11aBim\neC9juZJvOl989ndr8wO4RNLIWwKBgQDP73kb9T03gaIXFYcjJDjynnIskNdNsK05\n7ngcV9gXv4YGfkIx79mbeX03ds177NJq9l8qmV9tpPu6W+6i3zByeEj4wRswzd4c\nAw3qIyI2IplOsekfrinwJkzjit+8P4pBQeq/S9QaNKQE6Fr1NrrAHehX7xEf21YP\nVQFuegcAlQKBgHLNBL0gLL5Cv5DOeO2uBG1T/kZgGzEg/xv0tErG64XrwZXaFX39\nqd1kYhAI5KQKl5sew73m8Fi7V5b09lX8izu/bhioQuAkgdMDheAvzVjXFJiQ6gvu\nFDy10sKrrEsIbY88QuA8JnrcyvzfWLRXfcJvczfP7sfk9+F894+GWJIBAoGAVom4\nop0W5CHsXqUT/9kUZkzxAYEqSegMv/5yOIGKqp+H3O3xCK1kqCMQrOOhs0CldeSh\nSK5aG9y88xtNnrU6iXlsDTL46P/Uv126Dcafd15A5ZJ/jjLCu3KFL3HdmY/sLyqK\n0yBw3pMn6+7z4/fqEwifaPFS9Copj+n11Y+tmF0CgYEAv6mSpEGf7YVp5CcD2zCr\n4U0uVaO2HazpP/PawImnPDVA/YuFYLmeDBlEbV9PkR41rjYtzU+DtcwbVb53e07p\nLd9fq0mEXHb7A5XyGVA5fYYj9YEKw+w4Jm+5AQNXD4cY+xrjVPbxxxy5UaWAjG5d\nAXPMtazl9frye+afkDI2Wq4=\n-----END PRIVATE KEY-----\n",
    "client_email": "project-986397577977@project-986397577977.iam.gserviceaccount.com",
    "client_id": "109257776193164148662",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/project-986397577977%40project-986397577977.iam.gserviceaccount.com"
  }),
  //databaseURL: 'https://socialape-c5980.firebaseio.com/'
    databaseURL:'https://console.firebase.google.com/project/socialape-c5980/database/firestore/data~2Fscreams~2F5GKdreQIsWqMRSTMtg1y'
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from deeee!");

 });
 exports.addWelcomeMessages = functions.auth.user().onCreate(async (user) => {
   
    const fullName = user.displayName || 'Anonymous';
    console.log('A new user signed in for the first time.' + fullName);
    // Saves the new welcome message into the database
    // which then displays it in the FriendlyChat clients.
    // await admin.firestore().collection('screams').add({
    //   name: 'Firebase Bot',
    
    //   text: `${fullName} signed in for the first time! Welcome!`,
    //   timestamp: admin.firestore.FieldValue.serverTimestamp(),
    // });
    console.log('Welcome message written to database.');
  });
//  exports.userCreated = functions.database.ref('/users/109257776193164148662').onWrite(event => {
//     let email = event.data.child('email').val();
  
//     return request({
//       url: 'https://someservice.com/api/some/call',
//       headers: {
//         'X-Client-ID': functions.config().someservice.id,
//         'Authorization': `Bearer ${functions.config().someservice.key}`
//       },
//       body: {email: email}
//     });
//   });
    exports.hello = functions.https.onRequest(async (req, resp) => {
       defaultApp = admin.initializeApp({
        "type": "service_account",
        "project_id": "socialape-c5980",
        "private_key_id": "1ef5171f38c6ce0b0f43eeb9aa84e0be07bfe6c9",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC85XDJad8GTlbY\n+UOwVKt2jB2aLQN5ow0wRpmX6Sf+xR6WeglAG4eQfGABvgX1RbJHFYMZsCJuLiRs\nM/35micHx6Tra8iVlUYIs5TQBX1wzh2uYM7ytc5YiLBO+U2i09Ji03jwINLRwG9W\nO/MIdGTodpLeDYNI2OiQxAIVgmY+XF02O8Mi95WpNBtqClZjn6vfCNODTwOystuJ\nO9b+ojUlmkGv7CN037wTlKLPq7yq4J8jZS0/cnpBmoOh+KlBaTvD/tRLAugsDmso\nf71dSxnbCCQol58QiUUaTLJ6u2fkMlrPuKRF6W28LYGCMZ3uQxziVGNo8sR6YjAk\nUNvzwrrtAgMBAAECggEAGehMDkvXe1luPub9GieatrEj9DvdQKcUzXy5XyTqx94I\nQnItZ53++1mbn1GNJqUu/OHd772BE2R/uVluKXgzhzUiEOnhAmcNSm8650cBe+HB\nH2QGrjIyQWFJ8SLvO3ha4BQJ/8E4uOzwOD8Tp6KzHlD49ryat3iMeSJw+LtAQ6gR\n0W4fOVgzAiTZnzlH0bSUzwFYAAFORZJJv4c3aTUez7UVKlzoloiIamy5Xpgak5/d\nG2L6ayhmra8u8ToypP6e4SZjhiUH6qpwfHdIo28as/cIQCNflo6UwIVi/tEwXLW2\nOxNxVOJBJpgDBPLCmAtaJ4IUsF80+W6/ttwywqjOYQKBgQDwALAGK/M0X+d9iSGX\nCRiKhuQfA8WSdivCywGUTQtZB+Ys8bCh9JqLy1Nmy0mQSZjembAyF1ICIxc94Y5n\nlr2ND4ce6AwCAP+lEUdGlPH6Y8HB+IulbZcZ7rvrO3jtMepffKTCk4jX5bbhTVME\nFnRzZvGdLVTA/wungrWEk38BXQKBgQDJfLFUFc6cxeSKSBkXrFA7qHvFVazzNlTY\n7Dmiu7adjGz7dCMvQ6jb1nhLM9yfMal6PXYZ10oDX7Hy7pBz9Vb/jelBtfEZ+8T2\nHLIIDqHGDGExLnoPtg1CZLVY5G3WFH7H0q5dRA3nihK53m+884Gk6i8P0ID3r86/\nRMaoQF020QKBgQCJW5tirNywaQMP8d/rlSUag0EkDwCQZll9TrpEqiOIfODbcCfr\nSRb6UxAUkNw1XCnFnKgewwIIfxTaMbFS0A8EIJLwuVXF/9RQIKduWehzqYxG+3zQ\n3PvRt7SNWKhI+Hxu0eNqCQ4UokAciiis+j0DnzNBBaSwIEgHQuOoUNIrcQKBgQCZ\nW3k1QOvj05Ph1IKUzCi9X73lMxLSg3YNLa+otyuFuw5wTbNCFEOAIDurMawo1wnh\n6snrXTwOWVX+S6pTOFehZ4g05aC/YCxIDwtKqqhjL6UCZBevwadR84k8QZGAMlVV\nDnx8rIHQy/z4z99IeCcjOMPdS5v96ih42IZEJclNIQKBgDoubmIJduKiEImCzN5z\nzLQRfz9nDwK2ivzvZA9r26G2nNrZEUT7nafmNTlDaXSZsXUroBwfHyuGxZCyN49L\nNXw/EveaaxdEvY3kFKuChcJNWOj9htabwZmwnYYdHdYwDoAUJqCCTQpTmpS957GS\nqQEqF/7LyT+RQQE8UsUDa3ZD\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-t1wlh@socialape-c5980.iam.gserviceaccount.com",
        "client_id": "100778465003552715670",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t1wlh%40socialape-c5980.iam.gserviceaccount.com"
       });
       let str="";
       let strD=""
       for (const key in admin) { // eslint-disable-line
        str += key + typeof(key) +"\n";
      
        
      }
      const firestore = admin.firestore();
      console.log("d:"+firestore.project_id);
      for (const key in defaultApp.firestore()) { // eslint-disable-line
        strD += key + typeof(key) +"\n";
        console.log(key + typeof(key) +"\n");
        
      }
      
      return resp.json(str);

        // const firestore = defaultApp.firestore();
        // const users = await firestore.collection('users').get();
        // console.log('empty users collection? ' + users.empty);
        // resp.sendStatus(200);
    });

 exports.getScreams= functions.https.onRequest((req, res) =>{
     
  


    admin.firestore().collection("screams").get().then(data=> {
        let screams =[];
        data.forEach(element => {
            screams.push(element.data());
        });
        return res.json(screams);
    }).catch(err=> console.error(err));
 })

 //this method will be post, and 
 //body sample 
//  {
// 	"body":"postman scream",
// 	"userHandle":"postman userHandle"
// }
 exports.createScreams=functions.https.onRequest((req,res)=>{
   //new object
   if(req.method!="POST"){
     return res.status(400).json({error:'method not allowed'})
   }
   const newScream={
     body:req.body.body,
     userHandle:req.body.userHandle,
     createdAt:admin.firestore.Timestamp.fromDate(new Date())
   };

   admin.firestore()
   .collection('screams')
   .add(newScream )
   .then( (doc) => {
     res.json({message: doc.id +' created'});
   })
   .catch(err=>{
     res.status(500).json({error:'sth gone wrond'});
     console.error(err);
   });

 })



