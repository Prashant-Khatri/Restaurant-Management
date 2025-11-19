"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount")
  const staffId=searchParams.get("staffId")
  const router=useRouter()
  console.log(amount)
  const updateLastPayment=async ()=>{
    await axios.patch(`/api/update-lastPayment-date/${staffId}`)
  }
  useEffect(()=>{
    updateLastPayment()
  },[amount])
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-linear-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ₹{amount}
        </div>
        <Button onClick={()=>router.push('/staff')}>Return to Staff Page</Button>
      </div>
    </main>
  );
}