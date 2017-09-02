import React, { Component } from "react";
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import * as firebase from "firebase";
import RandomString from "randomstring";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null
    };
  }

  handleSubmission(event) {
    event.preventDefault();

    firebase
      .database()
      .ref("feedbacks/" + RandomString.generate(28))
      .set({
        user: firebase.auth().currentUser.uid,
        message: this.state.message.trim()
      });

    this.setState({
      errorMessage: "Your feedback has been recorded."
    });
  }

  render() {
    return (
      <div className="feedback">
        <h4>FEEDBACK</h4>
        <Form onSubmit={this.handleSubmission.bind(this)}>
          <FormGroup>
            <FormControl
              className="input"
              componentClass="textarea"
              placeholder="Let us know what you think..."
              onChange={event => this.setState({ message: event.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Button className="btn profile-button" bsStyle="info" type="submit">
              Send Feedback
            </Button>
            <p>{this.state.errorMessage}</p>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Feedback;
