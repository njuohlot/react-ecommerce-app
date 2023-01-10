import React from "react";
import { Link} from "react-router-dom";

function Card({item}) {
  return (
    <div className="box">
      <h2>
        <span className="imagename">{item.cat}</span>
      </h2>
      <Link to={`/shop/${item.cat}`}>
        <img
          src={`http://192.168.43.181:3002/${item.image}`}
          height="100"
          width="150"
          alt=""
        />
      </Link>
    </div>
  );
}

export default Card;
