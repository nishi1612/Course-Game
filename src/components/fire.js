import 'firebase/auth';
import 'firebase/firestore';

class Firebase{
    cnstructor(){
    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCtOHG2K2d4_cKQVBjItcMlwM2dE-rh3p8",
        authDomain: "coursegame-6af5a.firebaseapp.com",
        databaseURL: "https://coursegame-6af5a.firebaseio.com",
        projectId: "coursegame-6af5a"
    };
    firebase.initializeApp(config);

    this.fieldValue = firebase.firestore.FieldValue;
    this.emailAuthProvider = firebase.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.firestore();
    this.db.settings({ timestampsInSnapshots: true });
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
   
    const db = firebase.firestore();
    var docRef = db.collection("challenge");
    console.log(docRef.get());
    docRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log("hello");
        });
    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

    
}

export default Firebase;