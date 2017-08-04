import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';

class FAQ extends Component {

  render() {
    return (
      <div className="faq">
        <h4>General</h4>
        <Accordion>
          <Panel header="What is Spare?" eventKey="1">
            Spare is a peer to peer platform for physical storage space. We connect providers who have unused space to users looking for cheaper and more convenient storage venues. Our mission is to fully optimize the allocation and accessibility of space.
          </Panel>
          <Panel header="How do I get started?" eventKey="2">
            Register as a Provider or a User for free today.
          </Panel>
        </Accordion>
        <h4>Using Spare</h4>
        <Accordion>
          <Panel header="How do you make sure my belongings are safe?" eventKey="1">
            Spare must be used at your discretion. Currently we are working on implementing an optional insurance service, but we recommend that you review your existing insurance plan; often your property is covered even outside your home in event of theft or damage. It is also your responsibility to keep track of your storage inventory.
          </Panel>
          <Panel header="How secure is the storage area?" eventKey="2">
            Providers’ spaces vary on security levels. Users will be able to filter their search based on security needs and matched listings will describe the space’s security.
          </Panel>
          <Panel header="What can’t I store?" eventKey="3">
            Illegal or toxic products, flammables, perishables, or generally harmful products are prohibited (refer to Terms & Conditions for more details). When in doubt, check with your provider.
          </Panel>
          <Panel header="When can I access my items?" eventKey="4">
            Payment is taken and processed through the Spare app.
          </Panel>
          <Panel header="Who do I pay?" eventKey="5">
            Providers’ spaces vary on security levels. Users will be able to filter their search based on security needs and matched listings will describe the space’s security.
          </Panel>
          <Panel header="How do I store my belongings?" eventKey="6">
            After settling on a move in time with your Provider, you are responsible for transporting your items and moving them into the space.
          </Panel>
          <Panel header="Are my belongings private?" eventKey="7">
            Providers are allowed to view all stored items if there are any concerns.
          </Panel>
          <Panel header="Can I cancel a reservation?" eventKey="8">
            Yes. Notify us for a cancellation ASAP. Cancellation requests may or may not be approved depending on the grace period available (see Terms & Conditions).
          </Panel>
        </Accordion>
        <h4>For Providers</h4>
        <Accordion>
          <Panel header="What does it cost to list my space?" eventKey="1">
            It is free to list your space and register as a Provider! Spare simply takes a small commission fee off each transaction.
          </Panel>
          <Panel header="How much money can I get for my space?" eventKey="2">
            Spare calculates the “worth” of a space based on size, location, and additional features (such as security and climate control).
          </Panel>
          <Panel header="Who can rent my space?" eventKey="3">
            We match you with Spare users but you may decline any user’s request to reserve your space within the grace period.
          </Panel>
        </Accordion>
        <h4>Misc</h4>
        <Accordion>
          <Panel header="More questions?" eventKey="1">
            Email <a href="mailto:info@spare.ly">info@spare.ly</a> with any other inquiries.
          </Panel>
        </Accordion>
      </div>
    );
  }
}

export default FAQ;
