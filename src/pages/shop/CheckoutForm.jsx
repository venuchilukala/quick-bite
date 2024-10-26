import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Invalid price amount or price is not a number");
      return;
    }

    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    //Create a card element
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("success");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });
      if(confirmError){
        console.log(confirmError)
      }
      if(paymentIntent.status === "succeeded"){
        setCardError(`Your transactionId id ${paymentIntent.id}`)

        //Payment info 
        const paymentInfo = {
          email : user.email,
          transactionId : paymentIntent.id,
          price,
          quantity : cart.length,
          status : "Order pending",
          itemName : cart.map(item => item.name),
          cartItems : cart.map(item => item._id),
          menuItems : cart.map(item => item.menuItemId)
        }
      
        //Send paymentInfo to backend
        axiosSecure.post('/payments', paymentInfo).then(res =>{
          alert("Payment is successful!")
          navigate('/orders')
        })
      }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left side */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>
          Total Price: <span>&#8377; {price}</span>
        </p>
        <p>
          Total items : <span>{cart.length}</span>
        </p>
      </div>

      {/* Right side */}
      <div className="md:w-1/2 space-y-5 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl px-4 py-8 ">
        <h4 className="text-lg font-semibold">Process your payment</h4>
        <h5 className="font-medium">Debit/Credit card</h5>

        {/* Stripe Card */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5 w-full bg-primary text-white"
          >
            Pay
          </button>
        </form>
        {cardError ? (
          <p className="text-rose-600 text-xs italic">{cardError}</p>
        ) : (
          ""
        )}

        {/* Paypal option */}
        <hr />
        <div className="text-center">
          <button type="submit" className="btn btn-sm bg-indigo-500 text-white">
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
