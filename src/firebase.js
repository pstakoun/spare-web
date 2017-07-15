import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDISmmf3W3F_1pAhcZw804Zny7w2ApYjJ8",
  databaseURL: "https://decentralizedps.firebaseio.com",
  authDomain: "decentralizedps.firebaseapp.com",
  storageBucket: "decentralizedps.appspot.com"
};
firebase.initializeApp(config);

var db = firebase.database().ref();
var uid = firebase.auth().currentUser.uid;
var uref = db.child('users').child(uid);
