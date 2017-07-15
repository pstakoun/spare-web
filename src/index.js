import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var config = {
  apiKey: "AIzaSyDISmmf3W3F_1pAhcZw804Zny7w2ApYjJ8",
  databaseURL: "https://decentralizedps.firebaseio.com",
  authDomain: "decentralizedps.firebaseapp.com",
  storageBucket: "decentralizedps.appspot.com"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
