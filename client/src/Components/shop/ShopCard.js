import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { Store } from "../../Store";
import  {Link} from 'react-router-dom'
import axios from "../../axios";
function ShopCard({item}) {
  const { state, dispatch: ctxDispatch} = useContext(Store);
  const {
    cart: { basket },
    userInfo,
  } = state;
  const addToBasket = async (e) => {
    e.preventDefault();
    const existItem = basket.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/id/${item._id}`);
    if (data.countInstock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <div className="shop-box">
      <div className="d-flex justify-content-between align-items-center  flex-column">
        <Link to={`/product/${item._id}`}>
          <img
            src={`http://192.168.43.181:3002/${item.image}`}
            alt=""
            width="100px"
            height="150px"
          />
        </Link>

        <span>{item.title}</span>
        <div>
          <Rating
            name="half-rating-read"
            defaultValue={item.rating}
            precision={0.5}
            readOnly
          />
        </div>
        <p>$ {item.price}</p>
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    </div>
  );
}


export default ShopCard;