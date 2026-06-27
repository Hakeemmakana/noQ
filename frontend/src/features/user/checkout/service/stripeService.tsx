import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm"; 

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const PaymentPage = () => {
  const location = useLocation();
  const { clientSecret } = location.state || {};

  if (!clientSecret) return <div>Invalid Access</div>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Complete your payment</h1>
      <Elements
        key={clientSecret}
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <CheckoutForm onClose={() => window.history.back()} />
      </Elements>
    </div>
  );
};