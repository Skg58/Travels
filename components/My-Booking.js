"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react";

function BookingRow({ booking }) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="py-3 px-4">{booking.Designation}</td>
      <td className="py-3 px-4">{booking.travelDate.split("T")[0]}</td>
      <td className="py-3 px-4 font-semibold text-green-600">₹{booking.amount}</td>
      <td className="py-3 px-4 max-w-[5vw] text-wrap">
        {booking.passengers.map(p => p.name.split(" ")[0]).join(", ")}
      </td>
    </tr>
  );
}

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState('future');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.email) return;
    async function fetchData() {
      try {
        const res = await fetch('/api/order-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session?.user?.email }),
        });
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        setBookings([]);
      }
    }
    fetchData();
  }, [status, session]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureBookings = bookings.filter(b => {
    const bookingDate = new Date(b.travelDate);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  }).sort((a, b) => new Date(a.travelDate) - new Date(b.travelDate));

  const pastBookings = bookings.filter(b => {
    const bookingDate = new Date(b.travelDate);
    bookingDate.setHours(0, 0, 0, 0);
    return bookingDate < today;
  }).sort((a, b) => new Date(b.travelDate) - new Date(a.travelDate));;

  const filteredBookings = tab === 'future' ? futureBookings : pastBookings;

  return (
    <div className="max-w-2xl mx-auto py-15 px-4 h-[100vh] ">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>
      <div className="flex justify-center mb-6">
        <button
          className={`px-2 py-2 rounded-l-lg font-medium transition cursor-pointer ${tab === 'future'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          onClick={() => setTab('future')}
        >
          Upcoming
        </button>
        <button
          className={`px-6 py-2 rounded-r-lg font-medium transition cursor-pointer ${tab === 'past'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          onClick={() => setTab('past')}
        >
          Past
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md max-h-[68vh]  overflow-x-auto overflow-y-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 font-semibold">Designation</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="pt-3 px-4 font-semibold flex flex-col justify-center pb-2 md:pb-0 "><div> Amount</div><div className='text-green-600 pl-1'>(Paid)</div></th>
              <th className="py-3 px-4 font-semibold">Passengers</th>
            </tr>
          </thead>
          <tbody >
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">
                  {tab === "future" ? "You have no bookings at the moment." : "No Past Booking "}
                  <div className="mt-4">
                    <Link href="/Booking">
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              filteredBookings.map(booking => (
                <BookingRow key={booking._id} booking={booking} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}