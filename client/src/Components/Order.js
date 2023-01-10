import React, { useContext, useEffect, useReducer } from "react";
import OptionMenu from "./OptionMenu";
import Navbar from "../Components/Navbar";
import Footer2 from "./footer/Footer2";
import { Store } from "../Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { getError } from "../utils";
import LoadingBox from "./loadings/LoadingBox";
import MessageBox from "./MessageBox";
import SingleOrderreducer from "../SingleOrderReducer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const Order = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const [{ loading, order, error }, dispatch] = useReducer(SingleOrderreducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrder();
  }, [orderId]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Navbar />
      <OptionMenu />
      <h3 className="my-3" style={{ marginLeft: "20px" }}>
        <strong>Order Id:</strong> {orderId}
      </h3>

      <Col md={8}>
        <div className="order">
          <h4>Items</h4>
          <ListGroup variant="flush">
            {order.orderItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={6}>
                    <img
                      src={`http://192.168.43.181+:3002/${item.image}`}
                      alt={item.name}
                      height="50px"
                      width="50px"
                    ></img>{" "}
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>
                    <span>{item.quantity}</span>
                  </Col>
                  <Col md={3}>${item.price}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Col>
      <Col md={4}>
        <div className="order">
          <h4>Order Summary</h4>
          <ListGroup variant="flush" style={{ width: "90%" }}>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong> Order Total</strong>
                </Col>
                <Col>
                  <strong>${order.totalPrice.toFixed(2)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Col>

      <Footer2 />
    </div>
  );
};

export default Order;
