const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const moment = require("moment");
const stripe = require("stripe")("sk_live_GZo1QSQDVbdzUi6ssto24s0p");

app.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(bodyParser.urlencoded({ extended: true }));

var config = {
  apiKey: "AIzaSyDISmmf3W3F_1pAhcZw804Zny7w2ApYjJ8",
  databaseURL: "https://decentralizedps.firebaseio.com",
  authDomain: "decentralizedps.firebaseapp.com",
  storageBucket: "decentralizedps.appspot.com"
};
firebase.initializeApp(config);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

var getPrice = function(size, numDays) {
  var amount;
  if (size == "Small") {
    if (numDays <= 2) {
      amount = 171.4 * numDays + 427.6;
    } else if (numDays <= 10) {
      amount = 128.55 * numDays + 513.3;
    } else {
      amount = 85.7 * numDays + 941.8;
    }
  } else if (size == "Medium") {
    if (numDays <= 2) {
      amount = 308.55 * numDays + 490.45;
    } else if (numDays <= 10) {
      amount = 240.669 * numDays + 626.212;
    } else {
      amount = 172.788 * numDays + 1305.022;
    }
  } else if (size == "Large") {
    if (numDays <= 2) {
      amount = 623.55 * numDays + 375.45;
    } else if (numDays <= 10) {
      amount = 486.369 * numDays + 649.812;
    } else {
      amount = 345.031 * numDays + 2063.192;
    }
  }
  return Math.round(amount);
};

app.post("/price", (req, res) => {
  firebase
    .database()
    .ref("spaces/" + req.body.spaceId)
    .once("value")
    .then(snapshot => {
      var size = snapshot.val().size;
      var startDate = moment(req.body.startDate);
      var endDate = moment(req.body.endDate);
      var numDays = endDate.diff(startDate, "days") + 1;

      res.send("" + getPrice(size, numDays));
    });
});

app.post("/charge", (req, res) => {
  firebase
    .database()
    .ref("spaces/" + req.body.spaceId)
    .once("value")
    .then(snapshot => {
      var size = snapshot.val().size;
      var startDate = moment(req.body.startDate);
      var endDate = moment(req.body.endDate);
      var numDays = endDate.diff(startDate, "days") + 1;

      var amount = getPrice(size, numDays);

      stripe.customers
        .create({
          source: req.body.stripeToken.id
        })
        .then(customer =>
          stripe.charges.create({
            amount,
            description:
              size + " - " + numDays + " Day" + (numDays > 1 ? "s" : ""),
            currency: "usd",
            customer: customer.id
          })
        )
        .then(charge => res.send(charge));
    });
});

module.exports = app;
