const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const firebase = require('firebase');
const stripe = require('stripe')('sk_test_nrjKPBtN58e7Nr1xpzD5alQs');

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({ extended: true }))

var config = {
  apiKey: "AIzaSyDISmmf3W3F_1pAhcZw804Zny7w2ApYjJ8",
  databaseURL: "https://decentralizedps.firebaseio.com",
  authDomain: "decentralizedps.firebaseapp.com",
  storageBucket: "decentralizedps.appspot.com"
};
firebase.initializeApp(config);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.post('/charge', (req, res) => {
  firebase.database().ref('spaces/' + req.body.spaceId).once('value')
  .then(snapshot => {
    var size = snapshot.val().size;
    var sizeMult = size == 0 ? 1 : size == 1 ? 2.2 : 4.3;
    var numDays = 1; // TODO
    var amount = sizeMult * numDays - numDays / 7;
    stripe.customers.create({
      source: req.body.stripeToken.id
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
           currency: "usd",
           customer: customer.id
      }))
    .then(charge => res.send(charge));
  });
});

module.exports = app;
