import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";

import Topbar from "../topbar/Topbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import reducers from "../../../reducers";
import axios from "../../../axios";
import { getError } from "../../../utils";


export default function EditProduct() {
  const params = useParams();
  const { id} = params;
  const navigate = useNavigate();
  const [{ loading, products, error }, dispatch] = useReducer(reducers, {
    products: [],
    loading: true,
    error: "",
  });
  const [catselect, setCatSelect] = useState([]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);
  const [stock, setStock] = useState(null);
  //get product by id

  useEffect(() => {
    const productFetch = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get(`/id/${id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
        setName(res.data.name);
        setSlug(res.data.slug);
        setImage(res.data.image);
        setBrand(res.data.brand);
        setCat(res.data.cat);
        setDesc(res.data.description);
        setPrice(res.data.price);
        setRating(res.data.rating);
        setStock(res.data.countInstock);
        setImage(res.data.image)
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    productFetch();
  }, [id]);
  
  //fetch category
  useEffect(() => {
    const categoryFetchNames = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/categories");
        setCatSelect(result.data);
      } catch (error) {
        alert(error);
      }
    };
    categoryFetchNames();
  }, []);
  const handleCat = (e) => {
    e.preventDefault();
    setCat(e.target.value);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      slug: slug,
      cat: cat,
      brand: brand,
      description: desc,
      price: price,
      rating: rating,
      countInstock: stock,
    };

    await axios.put(`/${id}`, data);
    navigate("/admin/products");
  };

  return (
    <>
      <Topbar />
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Product</h1>
          <Link to="/admin/newproduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Chart
              data={productData}
              dataKey="Sales"
              title="Sales Performance"
            />
          </div>
          <div className="productTopRight">
            <div className="productInfoTop">
              <img
                src={`http://192.168.43.181:3002/${image}`}
                alt=""
                className="productInfoImg"
              />
              <span className="productName">{name}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">{id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Price:</span>
                <span className="productInfoValue">${price}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">Rating:</span>
                <span className="productInfoValue">{rating}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">in stock:</span>
                <span className="productInfoValue">
                  {stock}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form
            name="form"
            className="ProductForm"
            encType="multipart/form-data"
            method="PUT"
            onSubmit={updateProduct}
          >
            <div className="productFormLeft">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />

              <label>Slug</label>
              <input
                type="text"
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />

              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />

              <label>Rating</label>
              <input
                type="number"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />

              <label>Stock</label>
              <input
                type="number"
                name="countInstock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />

              <label>Price</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <label>Category</label>
              <select name="cat" id="category" value={cat} onChange={handleCat}>
                {catselect.map((item) => (
                  <option value={item.cat}>{item.cat}</option>
                ))}
              </select>

              <label>Description</label>
              <textarea
                name="description"
                style={{ height: "80px", padding: "4px" }}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="productFormRight">
              <button className="productButton" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
