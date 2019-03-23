import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCtOHG2K2d4_cKQVBjItcMlwM2dE-rh3p8",
    authDomain: "coursegame-6af5a.firebaseapp.com",
    databaseURL: "https://coursegame-6af5a.firebaseio.com",
    projectId: "coursegame-6af5a"
};

export default !firebase.apps.length
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();