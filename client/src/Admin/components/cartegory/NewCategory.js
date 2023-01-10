import './new.css'
import Topbar from "../topbar/Topbar";
import { useContext, useEffect, useReducer, useState } from "react";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import { Store } from "../../../Store";
import { getError } from "../../../utils";

export default function NewCategory() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [image, setImage] = useState(null);
  const [cat, setCat] = useState("");
 
  const handleFile = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const addCat = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("cat", cat);
    await axios.post("/cats/add", formData);
    navigate("/admin/category");
  };

  return (
    <>
      <Topbar />
      <div className="newProduct">
        <h1 className="addProductTitle">New Category</h1>
        <form
          name="form"
          className="addProductForm"
          encType="multipart/form-data"
          method="POST"
          onSubmit={addCat}
        >
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" onChange={handleFile} name="image" required />
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input
              type="text"
              name="cat"
              onChange={(e) => setCat(e.target.value)}
              placeholder="Apple Airpods"
              value={cat}
              required
            />
          </div>
         
          <button className="addProductButton" type="submit">
            Create Category
          </button>
        </form>
      </div>
    </>
  );
}
