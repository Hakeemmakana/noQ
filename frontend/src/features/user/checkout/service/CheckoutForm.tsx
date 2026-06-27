import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";

export const CheckoutForm = ({ onClose }: { onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/orderSuccess",
      },
    });

    if (error) {
      alert(error.message);
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="mb-4 text-lg font-semibold">Complete Payment</h2>
      <PaymentElement />
      
      <div className="mt-6 flex justify-end gap-3">
        <button 
          type="button" 
          onClick={onClose} 
          className="px-4 py-2 text-slate-600 hover:text-slate-800"
        >
          Cancel
        </button>
        <button 
          disabled={isProcessing || !stripe} 
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
};