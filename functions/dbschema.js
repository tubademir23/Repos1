let db={
    screams:[
        {
            userHandle: 'user',
            body:'this is the scream body at dbscheam.js',
            createdAt:'2019-09-17T08:16:23.420Z',
            likeCount:55,
            commentCount:5
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