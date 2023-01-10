import React, { useContext, useEffect, useReducer, useState } from "react";
import CurrencyFormat from "react-currency-format";
import styled from "styled-components";
import Footer2 from "./footer/Footer2";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Navbar from "./Navbar";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import orderReducer from "../orderReducer";
import { getError } from "../utils";
import { Store } from "../Store";
import CheckoutSteps from "./CheckoutSteps";
import OptionMenu from "./OptionMenu";

function Payment() {
  const [{ loading }, dispatch] = useReducer(orderReducer, {
    loading: false,
  })
  const { state, dispatch: Dispatch } = useContext(Store);
  const {
    cart: { basket },
    userInfo,  shippingAddress,
  } = state;
  const value = basket.reduce((a, c) => a + c.price * c.quantity, 0);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //123.2345 = 123.23
  basket.itemsPrice = round2(value); //sum of auantities * prices of all item
  basket.shippingPrice = basket.itemsPrice > 100 ? round2(0) : round2(10);
  basket.taxPrice = round2(0.15 * basket.itemsPrice);
  basket.totalPrice = basket.itemsPrice + basket.shippingPrice + basket.taxPrice;
  const [clientSecret, setClientSecret] = useState('');
  const elements = useElements();
  const stripe = useStripe();

  const navigate = useNavigate();
  useEffect(() => {
    if(!userInfo) {
      navigate('/login')
    }else{
       const fetchClientSecret = async () => {
      const response = await axios.post("/api/payment", {
        amount:  basket.totalPrice * 100,
        headers: { authorization: `Bearer ${userInfo.token}`, },
      })
        setClientSecret(response.data.clientSecret)
         
    };
    fetchClientSecret();

    }
   
   
    
  }, [userInfo]);

  const confirmPayment = async (e) => {
    e.preventDefault();

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        axios.post("/orders", {
          orderItems: basket,
          shippingAddress: shippingAddress,
          itemsPrice: basket.itemsPrice,
          shippingPrice: basket.shippingPrice,
          taxPrice: basket.taxPrice,
          totalPrice: basket.totalPrice,
          isPaid: true,
          
        },
        {
          headers: {Authorization: `Bearer ${userInfo.token}`,}
        }
        
        );

        Dispatch({
          type: "CART_CLEAR",
        });
        dispatch({
          type: "CREATE_SUCCESS",
        });
        localStorage.removeItem('basket')
        navigate("/success");
      })
      .catch((err)=>{
        dispatch({
          type: "CREATE_FAIL",
        });
        alert(getError(err))

      })
        
      
  };

  return (
    <Container>
      <Navbar />
      <OptionMenu/>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Main>
        <ReviewContainer>
          <h2>Review Your Order</h2>

          <AddressContainer>
            <h5>Shipping Address</h5>

            <div>
              <p>{shippingAddress.fullName}</p>
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.postalCode}</p>
             
              <p>
                {shippingAddress.city} {shippingAddress.state}
              </p>

              
            </div>
          </AddressContainer>

          <PaymentContainer>
            <h5>Payment Method</h5>

            <div>
              <p>Card Details</p>

              {/* Card Element */}

              <CardElement />
            </div>
          </PaymentContainer>

        </ReviewContainer>
        <Subtotal>
          <CurrencyFormat
            renderText={(value) => (
              <>
              
               
                <p>Items : <strong>${basket.itemsPrice.toFixed(2)}</strong></p>
                <p>Tax : <strong>${basket.taxPrice.toFixed(2)}</strong></p>
                <p>
                Subtotal ( {basket.length} items ) : <strong> {value}</strong>
              </p>
              </>
            )}
            decimalScale={2}
            value={basket.totalPrice * 100}
            displayType="text"
            thousandSeparator={true}
            prefix={"$ "}
          />

          <button onClick={confirmPayment} className='cart-btn-order'>Buy Now</button>
        </Subtotal>
      </Main>
      <Footer2 />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  background-color: rgb(234, 237, 237);
`;

const Main = styled.div`
  padding: 15px;
  display: flex;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ReviewContainer = styled.div`
  background-color: #fff;
  flex: 0.7;
  padding: 15px;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;

const AddressContainer = styled.div`
  margin-top: 20px;
  div {
    margin-top: 10px;
    margin-left: 10px;
    p {
      font-size: 14px;
      margin-top: 4px;
    }
  }
`;

const PaymentContainer = styled.div`
  margin-top: 15px;
  div {
    margin-top: 15px;
    margin-left: 15px;
    p {
      font-size: 14px;
    }
  }
`;

const OrderContainer = styled.div`
  margin-top: 30px;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  flex: 0.3;
  img {
    width: 100%;
  }
`;
const Description = styled.div`
  flex: 0.7;
  h4 {
    font-weight: 600;
    font-size: 18px;
  }
  p {
    font-weight: 600;
    margin-top: 10px;
  }
  button {
    background-color: transparent;
    color: #1384b4;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Subtotal = styled.div`
  flex: 0.3;
  background-color: #fff;
  margin-left: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
  }
  small {
    display: flex;
    align-items: center;
    margin-top: 10px;
    span {
      margin-left: 10px;
    }
  }
  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
    background-color: #ffd814;
    border: none;
    outline: none;
    border-radius: 8px;
  }
`;
export default Payment;
