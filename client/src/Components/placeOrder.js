import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer2 from "./footer/Footer2";
import Row from "react-bootstrap/Row";

import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import CheckoutSteps from "./CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import OptionMenu from "./OptionMenu";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo, shippingAddress } = state;

  const value = cart.basket.reduce((a, c) => a + c.price * c.quantity, 0);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //123.2345 = 123.23
  cart.itemsPrice = round2(value); //sum of auantities * prices of all item
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/address");
    }
  }, [shippingAddress, navigate]);

  return (
    <div>
      <Navbar />
      <OptionMenu/>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3" style={{ marginLeft: "20px" }}>
        Preview Order
      </h1>
      <Row>
        <Col md={8}>
          <div className="order address">
            <h5>Shipping</h5>
            <p>
              <strong>Name:</strong> {shippingAddress.fullName}
            </p>
            <p>
              {" "}
              <strong>Address: </strong> {shippingAddress.address},{" "}
              {shippingAddress.city}, {shippingAddress.postalCode},{" "}
              {shippingAddress.country}
            </p>
            <p>
              <Link to="/address">Edit</Link>
            </p>
          </div>

          <div className="order paymethod">
            <h5>Payment</h5>
            <p>Stripe</p>
          </div>

          <div className="order items">
            <h5>Basket Items</h5>
            <ListGroup variant="flush">
              {cart.basket.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-image"
                      ></img>{" "}
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <span>
                        <strong>Quantity: </strong>
                        {item.quantity}
                      </span>
                    </Col>
                    <Col md={3}>
                      <strong>Price: </strong>${item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Link to="/checkout">Edit</Link>
          </div>
        </Col>
        <Col md={4}>
          <div className="order">
            <h5>Order Summary</h5>
            <ListGroup variant="flush" style={{width: '90%'}}>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong> Order Total</strong>
                  </Col>
                  <Col>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <button
                    disabled={cart.basket.length === 0}
                    className="cart-btn-order"
                    onClick={()=>navigate('/payment')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
      <Footer2 />
    </div>
  );
};

export default PlaceOrder;
