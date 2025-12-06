"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Success = () => {
  const searchParams = useSearchParams();
  const Router = useRouter();
  const [pickupLocation, setPickupLocation] = useState("");
  const [receivingTime, setReceivingTime] = useState("");
  const { data: session, status } = useSession();
  const [Amount, setAmount] = useState(0);
  const [pack, setpack] = useState("");

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;
    async function fetchData() {
      if (!searchParams.size) Router.push("/My-Bookings");

      const Designation = searchParams.get("Designation");
      const travelDate = searchParams.get("travelDate");
      const Amount = searchParams.get("amount");
      setpack(searchParams.get("pack"));

      {
        Designation
          ? setPickupLocation(Designation + " Railway Station")
          : setPickupLocation("NO BOOKING");
      }
      {
        travelDate
          ? setReceivingTime("07:00 , " + `${travelDate.split("T")[0]}`)
          : setReceivingTime("NO BOOKING");
      }
      {
        Amount ? setAmount(Amount) : setAmount(0);
      }
    }
    fetchData();
  }, [status, session]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 mt-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        {/* Success Icon */}
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2l4-4"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Thank you for your payment. Your transaction was completed
          successfully.
        </p>

        {/* ----------------- RECEIPT SECTION ----------------- */}
        <div className="w-full bg-gray-50 rounded-lg p-5 mb-6 border border-gray-100">
          {/* Amount Row */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
            <span className="text-gray-600 font-medium">Total Paid</span>
            <span className="text-xl font-bold text-green-700">{Amount}</span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Package */}
            <div className="col-span-1">
              <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                Package
              </div>
              <div className="text-gray-900 text-sm">
                {pack || "Loading..."}
              </div>
            </div>

            {/* Time */}
            <div className="col-span-1">
              <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                Time & Date
              </div>
              <div className="text-gray-900 text-sm">
                {receivingTime || "Loading..."}
              </div>
            </div>

            {/* Pickup Location */}
            <div className="col-span-2">
              <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                Pickup Location
              </div>
              <div className="text-gray-900 text-sm">
                {pickupLocation || "Loading..."}
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------- */}

        <div className="w-full space-y-3">
          <Link
            href="/My-Bookings"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Go to My-Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
