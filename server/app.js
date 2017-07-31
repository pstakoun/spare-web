const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_nrjKPBtN58e7Nr1xpzD5alQs');

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.post('/charge', (req, res) => {
  let amount = 500;
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

module.exports = app;
