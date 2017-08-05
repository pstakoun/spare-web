import React, { Component } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import Checkout from "./Checkout";

class Payment extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_live_944zN2eKb5qols09SnwybEz5">
        <Elements>
          <Checkout handlePayment={this.props.handlePayment.bind(this)} />
        </Elements>
      </StripeProvider>
    );
  }
}

export default Payment;
