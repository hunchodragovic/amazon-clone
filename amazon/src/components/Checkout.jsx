import React from "react";
import { useAuth } from "../context/GlobalState";
import checkoutImg from "../images/checkoutAd.jpg";
import CheckoutProduct from "./CheckoutProduct";
import "../styles/Checkout.css";
import Subtotal from "./SubTotal";

const Checkout = () => {
  const { user, basket } = useAuth();
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img className="checkout-ad" src={checkoutImg} />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout-title">Your shopping Basket</h2>
          {basket.length > 0 ? (
            basket.map((item, index) => (
              <CheckoutProduct
                key={item.id || index} // Fallback to index if id is missing
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <p>
              You have no items in your basket. <br />
              To buy one or more items,go to the Products Page and click"Add to
              basket" to the Product that you want to buy.
            </p>
          )}
        </div>
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
