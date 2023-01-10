import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CheckoutSteps = (props) => {
  return (
    <div>
      <Row className="checkout-step">
        <Col className={props.step1 ? "active" : ""}>Sign-In</Col>
        <Col className={props.step2 ? "active" : ""}>Shipping</Col>
        <Col className={props.step4 ? "active" : ""}>Review Order</Col>
        <Col className={props.step4 ? "active" : ""}>Place Order</Col>
      </Row>
    </div>
  );
};

export default CheckoutSteps;