import axios from '../axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Store } from '../Store';
import Navbar from './Navbar'
import Footer2 from './footer/Footer2';
import {Link} from 'react-router-dom'
import OptionMenu from './OptionMenu';

const Success = () => {
    
   
 
  return (
    <>
    <Navbar/>
    <OptionMenu/>
    <div style={{
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      <h2>Your Payment is Successfull</h2>
      <p style={{textAlign: 'center'}}>Thanks for your purchase. An authomated payment receipt will be send to your registerd email</p>
      <Link to='/'><p style={{color: 'red !important'}}>Back to Home</p></Link>
        
         
        
        </div>
  
    <Footer2/>
    </>
    
  )
}

export default Success