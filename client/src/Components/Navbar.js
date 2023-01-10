import React, { useContext } from "react";
import "./nav.css";
import { SearchRounded, ShoppingBag } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Announcement from "./Announcement";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { Store } from "../Store";

const Header = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { basket },
    userInfo,
  } = state;

  const navigate = useNavigate();

  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch({ type: "USER_SIGNOUT" });
    //remove user info from user storage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
  };
  return (
    <>
      <Announcement />
      <div className="header">
        <a href="/" className="header_logo">
          <span className="logo_color">SHOP</span>PEE
        </a>

        <div className="header_search">
          <input type="text" className="header_searchInput" />
          <SearchRounded className="search_icon" />
        </div>
        <div className="header_nav">
          <div className="header_option">
            <span className="header__optionLineOne">
              {userInfo ? userInfo?.email : "Hello Guest"}
            </span>
            {userInfo ? (
              <span className="header__optionLineTwo" onClick={handleLogOut}>
                Sign out
              </span>
            ) : (
              <Link to="/login">
                <span className="header__optionLineTwo">Sign in</span>
              </Link>
            )}
          </div>

          <div className="header_option">
            <Link to={ userInfo ? "/orderhistory" : '/login'}>
              {" "}
              <span className="header__optionLineOne">Returns</span>
            </Link>
            <Link to="/orderhistory">
              <span className="header__optionLineTwo">Orders</span>
            </Link>
          </div>
          <div className="header_option">
            <Link to="/shop">
              <span className="header__optionLineOne">Your</span>
            </Link>
            <Link to="/shop">
              <span className="header__optionLineTwo">Shop</span>
            </Link>
          </div>

          <Link to="/checkout">
            <div className="header_optionBasket">
              <ShoppingBag />
              <span className="header_optionLineTwo header_basketCount">
                {basket.length > 0 && (
                  <Badge pill bg="danger">
                    {basket?.length}
                  </Badge>
                )}
              </span>
            </div>
          </Link>
         

        </div>
      </div>
    </>
  );
};

export default Header;
