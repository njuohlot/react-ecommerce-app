import "./newproduct.css";
import Topbar from "../topbar/Topbar";
import { useEffect, useReducer, useState } from "react";
import axios from "../../../axios";
import reducers from "../../../reducers";
import { useNavigate } from "react-router-dom";

export default function Newproduct() {
  const navigate = useNavigate();
  const [catselect, setCatSelect] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);
  const [stock, setStock] = useState("");
  const [{ loading, products, error }, dispatch] = useReducer(reducers, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const categoryFetchNames = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/categories");
        setCatSelect(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    categoryFetchNames();
  }, []);

  const handleCat = (e) => {
    e.preventDefault();
    setCat(e.target.value);
  };

  const handleFile = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("slug", slug);
    formData.append("cat", cat);
    formData.append("brand", brand);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("countInstock", stock);
    await axios.post("/products/add", formData);
    navigate("/admin/products");
  };

  return (
    <>
      <Topbar />
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form
          name="form"
          className="addProductForm"
          encType="multipart/form-data"
          method="POST"
          onSubmit={addProduct}
        >
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" onChange={handleFile} name="image" required />
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Apple Airpods"
              value={name}
              required
            />
          </div>
          <div className="addProductItem">
            <label>Slug</label>
            <input
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Slug"
              required
            />
          </div>
          <div className="addProductItem">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
              required
            />
          </div>
          <div className="addProductItem">
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="rating"
              required
            />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <input
              type="number"
              name="countInstock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="123"
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="2000"
            />
          </div>

          <div className="addProductItem">
            <label>Category</label>
            <select name="cat" id="category" value={cat} onChange={handleCat}>
            <option value='Default'>Select Category</option>
              {catselect.map((item) => (
                <option value={item.cat}>{item.cat}</option>
              ))}
            </select>
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <textarea
              name="description"
              style={{ height: "80px", padding: "4px" }}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>

          <button className="addProductButton" type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
