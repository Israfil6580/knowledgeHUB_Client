import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Public_Components/CheckoutForm";
import Heading from "../Public_Components/Heading";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  return (
    <div>
      <Heading
        title="All Study session"
        subTitle="Dive into interactive discussions, practical exercises, and gain insights on how to thrive in a virtual learning environment."
      />
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
