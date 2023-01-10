import React, { useContext, useEffect, useReducer} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer2 from "../footer/Footer2";
import axios from "../../axios";
import Rating from "@mui/material/Rating";
import reducers from "../../reducers";
import { getError } from "../../utils";
import LoadingBox from "../loadings/LoadingBox";
import MessageBox from "../MessageBox";
import { Store } from "../../Store";
import OptionMenu from '../OptionMenu'

const Product = () => {
  const param = useParams();
  const { id } = param;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const [{ loading, products, error }, dispatch] = useReducer(reducers, {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const productFetch = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/id/${id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    productFetch();
  }, [id]);
  const addToCartHandler = async () => {
    const existItem = cart.basket.find((x) => x._id === products._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/id/${products._id}`);
    if (data.countInstock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...products, quantity } });
    navigate("/checkout");
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      <Navbar />
      <OptionMenu />
      <div className="product_detail_page" key={products.slug}>
        <div className="col1">
          <img
            src={`http://192.168.43.181:3002/${products.image}`}
            alt={products.name}
          />
        </div>
        <div className="col2">
          <p>
            <strong>Name :</strong>
            {products.name}
          </p>
          <p>
            <strong>Description:</strong> {products.description}
          </p>
          <p>
            <strong>Category:</strong> {products.cat}
          </p>
          <p>
            <Rating
              name="half-rating-read"
              defaultValue={products.rating}
              precision={0.5}
              readOnly
            />
          </p>
          <p>
            <strong>Price: </strong> ${products.price}
          </p>

          <button onClick={addToCartHandler}>Add to cart</button>
        </div>
      </div>

      <Footer2 />
    </>
  );
};

export default Product;
