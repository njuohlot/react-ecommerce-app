import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { getError } from "../utils";
import { Store } from "../Store";
import Navbar from './Navbar'
import Footer2 from "./footer/Footer2";
import LoadingBox from "./loadings/LoadingBox";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OrderHistoryReducer from "./orderHistoryReducer";
import MessageBox from "./MessageBox";
import OptionMenu from "./OptionMenu";

const OrderHistory = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(
    OrderHistoryReducer,
    {
      loading: true,
      error: "",
    }
  );
  useEffect(() => {
    if(!userInfo) {
      navigate('/login');

    }else{
      const fetchData = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
          const { data } = await axios.get(
            `/orders/mine`,
  
            {
               headers: { Authorization: `Bearer ${userInfo.token}` } 
              }
          );
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (error) {
          dispatch({
            type: "FETCH_FAIL",
            payload: getError(error),
          });
        }
      };
      fetchData();

    }
   
   
  }, [userInfo]);
  return (
   
      loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
        <Navbar />
        <OptionMenu/>
        <Helmet>
          <title>Order History</title>
        </Helmet>
  
        <h1 style={{ marginLeft: "20px", lineHeight: "3" }}>Order History</h1>
        <div className="data-table">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>Yes</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer2 />
    </div>
      )

  );
};

export default OrderHistory;
