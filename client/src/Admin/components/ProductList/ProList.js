import "./proList.css";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../topbar/Topbar";
import Button from "react-bootstrap/Button";

import axios from "../../../axios";
import { useEffect, useState } from "react";

export default function ProList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
 
  useEffect
  (() => {
    const fetchdata = async () => {
      try {
        const result = await axios.get('/products')
        setData(result.data);
       
        
      } catch (error) {
       alert(error)
        
      }
     
    };
    fetchdata();
 
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/product/delete/${id}`);
    navigate("/admin/products")
    
  };

  

  return (
    <>
    <Topbar/>
    <div>
    <Link to="/admin/newproduct">
            <button className="productAddButton">Create New</button>
          </Link>

    </div>
          
   
    <div className="productList">
    <div className="data-table">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>SLUG</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>RATING</th>
                <th>CREATED</th>
                <th>ACTION</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.slug}</td>
                  <td>{item.cat}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.countInstock}
                  </td>
                  <td>{item.rating}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      
                      onClick={() => {
                        navigate(`/admin/product/${item._id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="danger"
                      
                      onClick={() => navigate(`/admin/delete/product/${item._id}`)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div></>
    
  );
}