import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import MessageBox from "./MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from './Navbar'
import Footer2 from './footer/Footer2'
import axios from '../axios'
import CurrencyFormat from 'react-currency-format'
import {Helmet} from 'react-helmet-async'
import OptionMenu from "./OptionMenu";


const  Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch} = useContext(Store);
  const {
    cart: { basket },
    userInfo,
  } = state;
 
  const total = basket.reduce((a, c) => a + c.price * c.quantity, 0) * 100;
 

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/id/${item._id}`);
    if (data.countInstock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: { ...item } });
  };
  
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Navbar />
      <OptionMenu />
      <h3
        style={{
          fontWeight: "300",
          textAlign: "center",
          lineHeight: "1",
          marginTop: "20px",
        }}
      >
        Hello {userInfo ? userInfo.name : "Client"}
      </h3>
      <h1 style={{ fontWeight: "300", textAlign: "center", lineHeight: "1" }}>
        Your Basket
      </h1>
      <Row>
        <Col md={8}>
          {basket.length === 0 ? (
            <MessageBox>
              Basket is Empty. <Link to="/shop">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {basket.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={`http://192.168.43.181:3002/${item.image}`}
                        alt={item.name}
                        className="cart-img"
                      />{" "}
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={() => {
                          updateCartHandler(item, item.quantity - 1);
                        }}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() => {
                          updateCartHandler(item, item.quantity + 1);
                        }}
                        disabled={item.quantity === item.countInstock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="cardbody">
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <p>
                          Subtotal ( {basket.length} items ) :{" "}
                          <strong> {value}</strong>
                        </p>
                        <small>
                          <input type="checkbox" />
                          <span>This order contains a gift.</span>
                        </small>
                      </>
                    )}
                    decimalScale={2}
                    value={basket.reduce((a, c) => a + c.price * c.quantity, 0)}
                    displayType="text"
                    thousandSeparator={true}
                    prefix={"$ "}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    {basket.length > 0 && (
                      <button
                        className="cart-btn"
                        onClick={() => navigate("/address")}
                      >
                        Proceed to Checkout
                      </button>
                    )}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer2 />
    </div>
  );
};

export default Checkout;
