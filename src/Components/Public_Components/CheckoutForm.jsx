/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FidgetSpinner } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ handleOpen, session }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [sessionBooked, setSessionBooked] = useState(false); // Add state to track booking

  useEffect(() => {
    if (session.RegistrationFee > 1) {
      getClientSecret(session.RegistrationFee);
    }
  }, [session.RegistrationFee]);

  const getClientSecret = async (price) => {
    try {
      const { data } = await axiosSecure.post(`/create-payment-intent`, {
        price,
      });
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
      setCardError("Failed to fetch client secret. Please try again.");
    }
  };

  const handleFreeBooking = async () => {
    const paymentInfo = {
      ...session,
      TutorEmail: user.email,
      transactionId: "free-session",
      sessionId: session._id,
      date: new Date(),
    };
    delete paymentInfo._id;
    try {
      await axiosSecure.post("/Booked_Session", paymentInfo);
      handleOpen();
      setSessionBooked(true); // Update booking state
      toast.success("Session booked successfully!");
      navigate("/dashboard/bookedsession");
    } catch (error) {
      console.error("Error booking session:", error);
      toast.error("Failed to book the session. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (session.RegistrationFee === 0) {
      handleFreeBooking();
      return;
    }

    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      } else {
        setCardError("");
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user.email,
              name: user.displayName,
            },
          },
        });

      if (confirmError) {
        setCardError(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          ...session,
          sessionId: session._id,
          TutorEmail: user.email,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        delete paymentInfo._id;

        try {
          await axiosSecure.post("/Booked_Session", paymentInfo);
          handleOpen();
          setSessionBooked(true); // Update booking state
          toast.success("Payment Successful");
          navigate("/dashboard/bookedsession");
        } catch (error) {
          console.error("Error booking session:", error);
          toast.error("Failed to book the session. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      setCardError("An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {session.RegistrationFee > 0 && (
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
        )}

        {processing ? (
          <Button className="w-32 flex justify-center" disabled>
            <FidgetSpinner
              visible={true}
              height="23"
              width="23"
              ariaLabel="fidget-spinner-loading"
              wrapperStyle={{}}
              wrapperClass="fidget-spinner-wrapper"
            />
          </Button>
        ) : session.RegistrationFee > 0 ? (
          <Button
            className="text-[15px] font-normal capitalize w-32"
            type="submit"
            disabled={
              !stripe ||
              (session.RegistrationFee > 0 && !clientSecret) ||
              processing ||
              sessionBooked // Disable if already booked
            }
          >
            Pay ${session.RegistrationFee}
          </Button>
        ) : (
          <Button
            className="text-[15px] font-normal capitalize w-32"
            type="button"
            onClick={handleFreeBooking}
            disabled={sessionBooked}
          >
            Book Now
          </Button>
        )}
      </form>
      {cardError && <p className="error-message">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
