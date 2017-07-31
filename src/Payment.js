import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Checkout from './Checkout';

class Payment extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_oy3aPSQm5Bj35CCnpqAuQ8QI">
        <Elements>
          <Checkout handlePayment={this.props.handlePayment.bind(this)} />
        </Elements>
      </StripeProvider>
    );
  }
}

export default Payment;
