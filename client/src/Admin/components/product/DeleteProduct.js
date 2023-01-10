import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../../axios'

const DeleteProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const {id} = params;

    useEffect
    (() => {
        
      const deleteProduct = async () => {
        try {
            await axios.delete(`/product/delete/${id}`);
            navigate('/admin/products');
         
          
        } catch (error) {
         navigate('/admin/products');
          
        }
       
      };
      deleteProduct();
   
    }, [id, navigate]);
  
  
    
  return (
    <div>Product Id: {id}</div>
  )
}

export default DeleteProduct