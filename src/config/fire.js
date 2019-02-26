import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB5C8uON6q31pcQ408dCVl9BEHYnISNOH4",
    authDomain: "sengroup39-b1138.firebaseapp.com",
    databaseURL: "https://sengroup39-b1138.firebaseio.com",
    projectId: "sengroup39-b1138",
    storageBucket: "sengroup39-b1138.appspot.com",
    messagingSenderId: "539450665507"
};
const fire = firebase.initializeApp(config);
export default fire;