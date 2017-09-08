import React, { Component } from "react";
import * as firebase from "firebase";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import TransactionDetails from "./TransactionDetails";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trans: null
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("trans")
      .orderByChild("userId")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        this.setState({ trans: snapshot.val() });
      });
  }

  renderTransactions() {
    var arr = [];
    for (var key in this.state.trans) {
      arr.push(
        <Col md={12}>
          <TransactionDetails trans={this.state.trans[key]} />
        </Col>
      );
      setTimeout(1000);
    }
    if (arr.length === 0) {
      arr.push(
        <h2>
          <Link to="/">Make your first booking now!</Link>
        </h2>
      );
    }
    return arr;
  }

  render() {
    return (
      <div>
        <h1>HISTORY</h1>
        {this.renderTransactions()}
      </div>
    );
  }
}

export default History;
