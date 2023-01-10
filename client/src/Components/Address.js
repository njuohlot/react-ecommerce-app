import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Store } from "../Store";
import CheckoutSteps from "./CheckoutSteps";
import Navbar from "./Navbar";
import OptionMenu from '../Components/OptionMenu'
function Address() {
  const navigate = useNavigate();
  const { state, dispatch} = useContext(Store);
  const {shippingAddress} = state;
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostal] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

  const deliver = (e) => {
    e.preventDefault();
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: {
      fullName,
      address,
      city,
      postalCode,
      country,
            } });
    localStorage.setItem(
      'shippingAddress', JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
        
      })
    )
    navigate('/orders');
  };

  return (
   <>
      <Navbar />
      <OptionMenu/>
      <Container>
      <CheckoutSteps step1></CheckoutSteps>
      <Main>
        <FormContainer>
         
          
          <InputContainer>
            <p>fullName</p>
            <input
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </InputContainer>
          <InputContainer>
            <p>Address</p>
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </InputContainer>
          <InputContainer>
            <p>City</p>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </InputContainer>
          <InputContainer>
            <p>Postal Code</p>
            <input
              type="text"
              onChange={(e) => setPostal(e.target.value)}
              value={postalCode}
            />
          </InputContainer>
          <InputContainer>
            <p>country</p>
            <input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </InputContainer>
         
          <button onClick={deliver}>Deliver to this Address</button>
        </FormContainer>
      </Main>
    </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1400px;
  margin: auto;
  background-color: rgb(234, 237, 237);
  position: relative;
`;

const Main = styled.div`
  padding: 15px;
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  min-width: 300px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #fff;
  margin: auto;
  button {
    align-self: flex-start;
    height: 33px;
    width: 250px;
    margin-top: 20px;
    background-color: #ffa32a;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;
    &:hover {
      border: 1px solid orange;
    }
  }
`;
export default Address;