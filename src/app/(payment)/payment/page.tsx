"use client"
import CheckoutPage from "@/components/CheckouPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useSearchParams } from "next/navigation";
if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY===undefined){
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
function PaymentPage() {
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount");
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h2 className="text-2xl">
          Pay
          <span className="font-bold">₹{amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: Number(amount)*100,
          currency: "usd",
        }}
      >
        <CheckoutPage amount={Number(amount)}/>
      </Elements>
    </main>
  );
}

export default PaymentPage;