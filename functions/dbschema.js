let db={
    users:[
        {
            userId:'2vGW6Pek1cNlKla90VVgFeluXQe2',
            email:'new566@gmail.com',
            handle:'new566',
            createdAt:'2019-09-17T08:16:23.420Z',
            imageUrl:'18469778006.jpg',
            bio:'hi ia m here',
            website:'https://user.com',
            location:'London, UK'
        }
    ],
    screams:[
        {
            userHandle: 'new566',
            body:'this is the scream body at dbscheam.js',
            createdAt:'2019-09-17T08:16:23.420Z',
            likeCount:55,
            commentCount:5
        }
    ],
    comments:[
        {
            userHandle:'new566',
            screamId:'8u7p2whHpEOcwZlCiAa4',
            body:'first comment',
            createdAt:'2019-09-17T08:16:23.420Z'
        }
    ],
    notifications: [
        {
          recipient: 'new566',
          sender: 'user566',
          read: 'true | false',
          screamId: '8u7p2whHpEOcwZlCiAa4',
          type: 'like | comment',
          createdAt: '2019-09-22T08:16:23.420Z'
        }
      ]
}

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
const userDetails = {
    // Redux data
    credentials: {
        userId:'2vGW6Pek1cNlKla90VVgFeluXQe2',
        email:'new566@gmail.com',
        handle:'new566',
        createdAt:'2019-09-17T08:16:23.420Z',
        imageUrl:'18469778006.jpg',
        bio:'postman biosu',
        website:'https://diyanet.com',
        location:'ankara'
    
    },
    likes: [
      {
        userHandle: 'new566',
        screamId: '8u7p2whHpEOcwZlCiAa4'
      },
      {
        userHandle: 'new566',
        screamId: 'fA25rqzpSgPApNbLIruf'
      }
    ]
  }

 const deleteCollection=(db, collectionPath, batchSize) =>{
    let collectionRef = db.collection(collectionPath);
    let query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        this.deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}

deleteQueryBatch=(db, query, batchSize, resolve, reject) =>{
    query.get()
        .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size === 0) {
                return 0;
            }

            // Delete documents in a batch
            let batch = db.batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            return batch.commit().then(() => {
                return snapshot.size;
            });
        }).then((numDeleted) => {
        if (numDeleted === 0) {
            resolve();
            return;
        }

        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
            this.deleteQueryBatch(db, query, batchSize, resolve, reject);
        });
    })
        .catch(reject);
}
