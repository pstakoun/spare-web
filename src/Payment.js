import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Checkout from './Checkout';

class Payment extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_12345">
        <Elements>
          <Checkout />
        </Elements>
      </StripeProvider>
    );
  }
}

export default Payment;
