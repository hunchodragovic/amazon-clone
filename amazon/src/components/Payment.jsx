import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Payment.css";
import { useAuth } from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { getBasketTotal } from "../context/AppReducer";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const Payment = () => {
  const { basket, user, dispatch } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: "post",
          url: `http://127.0.0.1:5001/clone-9b843/us-central1/api/payments/create?total=${
            getBasketTotal(basket) * 100
          }`,
        });

        setClientSecret(response.data.clientSecret);
        return response;
      } catch (error) {
        console.error("Error getting client secret:", error);
        setError("Failed to load payment information. Please try again.");
      }
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientSecret) {
      setError("Client secret not loaded yet.");
      return;
    }

    setProcessing(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log("Stripe result:", result);

      if (result.error) {
        throw new Error(result.error.message || "Payment confirmation failed");
      }

      if (!result || !result.paymentIntent) {
        console.error("Missing payment intent in result:", result);
        throw new Error("Payment was not confirmed. Please try again.");
      }

      const { paymentIntent } = result;

      // Check if user is authenticated
      if (!user || !user.uid) {
        throw new Error("Please sign in to complete purchase");
      }

      const ref = doc(db, "users", user.uid, "orders", paymentIntent.id);
      await setDoc(ref, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      setSucceeded(true);
      setError(null);
      setProcessing(false);
      dispatch({
        type: "EMPTY_BASKET",
      });
      navigate("/orders", { replace: true });
    } catch (error) {
      console.error("Payment error:", error);
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>
        {/* Delivery Address */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>Ksar Chellala, Algeria</p>
          </div>
        </div>
        {/* Review Items*/}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment method*/}
        <div className="payment-section">
          <h3>Payment Method</h3>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  type="submit"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div className="payment-error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
