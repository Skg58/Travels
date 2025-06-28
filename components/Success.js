"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react"


const Success = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [receivingTime, setReceivingTime] = useState('');
  const { data: session, status } = useSession();


  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.email) return;
    async function fetchData() {
      const res = await fetch('/api/order-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email }),
      });

      const data1 = await res.json();
      const data = data1[data1.length - 1]

      { data ? setPickupLocation(data.Designation + " Railway Station") : setPickupLocation("NO BOOKING") }
      { data ? setReceivingTime("07:00 , " + `${data.travelDate.split("T")[0]}`) : setReceivingTime("NO BOOKING") }
    }
    fetchData();
  }, [status, session]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 mt-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" />
        </svg>
        <h1 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6 text-center">
          Thank you for your payment. Your transaction was completed successfully.
        </p>
        <div className="mb-4 w-full">
          <div className="text-gray-700 font-semibold">Pickup Location:</div>
          <div className="text-gray-900">{pickupLocation || 'Loading...'}</div>
        </div>
        <div className="mb-6 w-full">
          <div className="text-gray-700 font-semibold">Time of Receiving:</div>
          <div className="text-gray-900">{receivingTime || 'Loading...'}</div>
        </div>
        <Link href="/" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;