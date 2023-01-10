import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Address from "./Components/Address";
import Checkout from "./Components/Checkout";

import Home from "./Components/Home";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import SignUp from "./Components/SignUp";
import Shop from "./Components/shop/Shop";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Product from "./Components/singleproduct/Product";

import Success from "./Components/Success";
import PlaceOrder from "./Components/placeOrder";
import OrderHistory from "./Components/OrderHistory";
import Order from "./Components/Order";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import AdminHome from "./Admin/components/home/AdminHome";
import User from './Admin/components/user/User'
import UserList from './Admin/components/userList/UserList'
import Analytic from './Admin/components/Analytic/Analytic'
import Transactions from "./Admin/components/Transactions/Transactions";
import Category from './Admin/components/cartegory/Category'
import EditProduct from './Admin/components/product/EditProduct'
import ProList from './Admin/components/ProductList/ProList'
import Newproduct from './Admin/components/newProduct/Newproduct'
import NewUser from "./Admin/components/newuser/NewUser";
import NewCategory from "./Admin/components/cartegory/NewCategory";
import DeleteProduct from "./Admin/components/product/DeleteProduct";
import Report from "./Admin/components/reports/Report";


const promise = loadStripe(
  "*****************************************************************"
);
function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/address" element={<Address />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:cat" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/success" element={<Success />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />

          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminHome  />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <AdminRoute>
                <User/>
              </AdminRoute>
            }
          />
           <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserList/>
              </AdminRoute>
            }
          />
              <Route
            path="/admin/analytic"
            element={
              <AdminRoute>
                <Analytic/>
              </AdminRoute>
            }
          />
              <Route
            path="/admin/transactions"
            element={
              <AdminRoute>
                <Transactions/>
              </AdminRoute>
            }
          />
                 <Route
            path="/admin/category"
            element={
              <AdminRoute>
                <Category/>
              </AdminRoute>
            }
          />
                 <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProList/>
              </AdminRoute>
            }
          />
                 <Route
            path="/admin/product/:id"
            element={
              <AdminRoute>
                <EditProduct/>
              </AdminRoute>
            }
          />
                <Route
            path="/admin/newproduct"
            element={
              <AdminRoute>
                <Newproduct/>
              </AdminRoute>
            }
          />
                <Route
            path="/admin/newuser"
            element={
              <AdminRoute>
                <NewUser/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/report"
            element={
              <AdminRoute>
                <Report/>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/newcat"
            element={
              <AdminRoute>
                <NewCategory/>
              </AdminRoute>
            }
          />
           <Route
            path="/admin/delete/product/:id"
            element={
              <AdminRoute>
                <DeleteProduct/>
              </AdminRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
