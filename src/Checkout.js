import React, { Component } from "react";
import * as firebase from "firebase";
import { Form } from "react-bootstrap";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from "react-stripe-elements";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: null,
      lname: null,
      email: null,
      phone: null
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot =>
        this.setState({
          fname: snapshot.val().fname,
          lname: snapshot.val().lname,
          email: snapshot.val().email,
          phone: snapshot.val().phone
        })
      );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.stripe
      .createToken({
        name: this.state.fname + " " + this.state.lname,
        email: this.state.email
      })
      .then(({ token }) => {
        console.log("Received Stripe token:", token);
        this.props.handlePayment(token);
      });
  };

  render() {
    var style = {
      base: {
        iconColor: "#666EE8",
        color: "#31325F",
        lineHeight: "40px",
        fontWeight: 300,
        fontFamily: "Helvetica Neue",
        fontSize: "15px",

        "::placeholder": {
          color: "#CFD7E0"
        }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="group">
          <label>
            <span>Card number</span>
            <CardNumberElement className="field" style={style} />
          </label>
          <label>
            <span>Expiry date</span>
            <CardExpiryElement className="field" style={style} />
          </label>
          <label>
            <span>CVC</span>
            <CardCVCElement className="field" style={style} />
          </label>
          <label>
            <span>Postal code</span>
            <PostalCodeElement className="field" style={style} />
          </label>
          <button className="button">Pay</button>
        </div>
      </Form>
    );
  }
}

export default injectStripe(Checkout);
