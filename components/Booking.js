"use client";

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from "next-auth/react";
import Link from 'next/link';
import Razorpay from "razorpay";
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import Image from 'next/image';

const locations = [
  { id: 1, name: 'Agra', price: 1800 },
  { id: 2, name: 'Amritsar', price: 1900 },
  { id: 3, name: 'Bengaluru', price: 2700 },
  { id: 4, name: 'Chennai', price: 2200 },
  { id: 5, name: 'Darjeeling', price: 2000 },
  { id: 6, name: 'Delhi', price: 2000 },
  { id: 7, name: 'Goa', price: 2600 },
  { id: 8, name: 'Hyderabad', price: 2300 },
  { id: 9, name: 'Jaipur', price: 2100 },
  { id: 10, name: 'Kolkata', price: 2100 },
  { id: 11, name: 'Ladakh', price: 3000 },
  { id: 12, name: 'Leh', price: 2900 },
  { id: 13, name: 'Manali', price: 2200 },
  { id: 14, name: 'Mumbai', price: 2500 },
  { id: 15, name: 'Mysuru', price: 2000 },
  { id: 16, name: 'Pondicherry', price: 1900 },
  { id: 17, name: 'Rishikesh', price: 2000 },
  { id: 18, name: 'Shimla', price: 2100 },
  { id: 19, name: 'Udaipur', price: 2400 },
  { id: 20, name: 'Varanasi', price: 2000 }
];
const packs = [
  { id: 'starter', name: 'Starter', price: 100 },
  { id: 'pro', name: 'Pro', price: 500 },
  { id: 'enterprise', name: 'Enterprise', price: 1000 },
];

const initialPassenger = { name: '', age: '', phone: '' };

const StepIndicator = ({ step }) => (
  <div className="flex justify-center mb-8">
    {['Location', 'Passengers', 'Summary & Payment'].map((label, idx) => (
      <div key={label} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300
          ${step === idx + 1 ? 'bg-indigo-600 text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-500'}`}>{idx + 1}</div>
        {idx < 2 && <div className="w-10 h-1 bg-gray-300 mx-2 rounded"></div>}
      </div>
    ))}
  </div>
);

const PassengerAvatar = ({ idx }) => (
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-400 flex items-center justify-center font-bold text-indigo-800 shadow">
    {idx + 1}
  </div>
);

const Page = () => {
  const Router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [travelDate, setTravelDate] = useState('');
  const [pickup, setPickup] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPack, setSelectedPack] = useState('pro');
  const [passengers, setPassengers] = useState([{ ...initialPassenger }]);
  const [couponCode, setCouponCode] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [discount, setdiscount] = useState(0)
  const [couponapplied, setcouponapplied] = useState(false)
  const [appliedCode, setappliedCode] = useState("");


  useEffect(() => {
    toast("Welcome! to Booking page", {
      action: {
        label: "Undo",
      },
    })

  }, [])

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const selectedLocationObj = locations.find(l => l.name === selectedLocation);
  const selectedPackObj = packs.find(p => p.id === selectedPack);

  const totalAmount = passengers.length * (selectedLocationObj ? selectedLocationObj.price + selectedPackObj?.price : 0) - discount;


  const handlePassengerChange = (idx, e) => {
    const updated = passengers.map((p, i) =>
      i === idx ? { ...p, [e.target.name]: e.target.value } : p
    );
    setPassengers(updated);
  };

  const allPassengersValid = passengers.every(p => p.name && p.age && p.phone);

  const CanAddPassenger = () => {
    return passengers.every(p =>
      p.name.trim() !== '' &&
      p.age > 0 &&
      p.phone.trim() !== ''
    );
  };
  const handleDelete = (index) => {
    const newarr = passengers.filter((_, i) => { return i !== index })
    setPassengers(newarr);

  }

  const handleApplyCoupon = async () => {
    setdiscount(0);
    setcouponapplied(false);
    const res = await fetch('/api/validate-coupon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: couponCode, totalAmount: totalAmount + discount })
    });

    const data = await res.json();
    if (data.valid) {
      if (couponCode !== appliedCode) {
        setdiscount(data.discountAmount);
        setappliedCode(couponCode);
        setcouponapplied(true);
        toast(`Coupon "${couponCode}" applied!`, {
          action: {
            label: "Undo",
          },
        })
      } else {
        toast("Coupon already applied!", {
          action: {
            label: "Undo",
          },
        })

      }
    } else {
      setdiscount(0);
      setappliedCode("");
      setcouponapplied(false);
      toast("Invalid coupon code.", {
        action: {
          label: "Undo",
        },
      })

    }
  };


  // --------------------Razorpay-integration---------------------------
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject('Razorpay SDK failed to load');
      document.body.appendChild(script);
    });
  const handlePayment = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ totalAmount: totalAmount }) // sending amount as part of the body else you get Error

    });
    const order = await res.json();
    await loadRazorpay();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Travels',
      description: 'Transaction',
      order_id: order.id,
      handler: async function (response) {
        {
          toast("Redirecting...", {
            action: {
              label: "Undo",
              // onClick: () => console.log("Undo"),
            },
          })
        }
        try {
          const res = await fetch('/api/save-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              // ...formData, // name, email, phone
              travelDate,
              amount: totalAmount,
              Designation: selectedLocation,
              pack: selectedPack,
              passengers,
              email: session?.user?.email,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            }),
          });

          const data = await res.json();
          if (data.success) {
            console.log('✅ Payment successful and user saved!');

          } else {
            console.log('⚠️ Payment was successful, but saving user failed.');
          }
        } catch (err) {
          console.error(err);
          console.log('❌ Payment successful, but something went wrong while saving data.');
        }

        Router.push("/Success")
      },
      modal: {
        ondismiss: function () {
          toast("Payment Cancelled ", {
            action: {
              label: "Undo",
            },
          })
        }
      },
      prefill: {
        name: 'Travels',
        email: 'contact@Travels.in',
        contact: '9876543210',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
    rzp.open();
  };

  // -----------------------------------------------------------------------
  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="min-h-full  flex items-center  justify-center py-8 my-5 mb-7 ">
      <div className="w-[85vw]  md:w-full max-w-4xl bg-white/90 rounded-2xl shadow-2xl flex overflow-hidden">
        <div className="flex-1 p-8 flex flex-col justify-center w-[70vw]">
          <StepIndicator step={step} />
          {step === 1 && (
            <form className="animate-fadeIn" onSubmit={e => { e.preventDefault(); handleNext(); }}>
              <label className="block mb-2 text-gray-700 font-semibold text-lg">Select Your Destination</label>
              <select
                className="w-full border-2 border-indigo-200 rounded-lg px-4 py-3 mb-4 cursor-pointer "
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                required
              >
                <option value="" >Choose a city</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.name}>{loc.name} </option>
                ))}
              </select>
              <label className="block mb-2 text-gray-700 font-semibold text-lg ">Select Date</label>
              <input
                type="date"
                value={travelDate}
                min={today}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full border-2 border-indigo-200 rounded-lg px-4 py-3 mb-4 cursor-pointer "
                required
              />
              <label className="block mb-2 text-gray-700 font-semibold text-lg ">Choose Your Package</label>
              <div className="flex gap-4 flex-col md:flex-row">
                {packs.map(pack => (
                  <label
                    key={pack.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 whitespace-nowrap cursor-pointer
                      ${selectedPack === pack.id ? 'border-indigo-600 bg-indigo-50 scale-105 shadow-lg' : 'border-gray-200 bg-white'}
                      ${pack.id === 'pro' ? 'z-10' : ''}`}
                  >
                    <input
                      type="radio"
                      name="pack"
                      value={pack.id}
                      checked={selectedPack === pack.id}
                      onChange={e => setSelectedPack(e.target.value)}
                      className="accent-indigo-600"
                    />
                    <div className="font-semibold flex items-center gap-2">
                      {pack.name}
                      {pack.id === 'pro' && <span className="ml-1 px-2  py-0.5 bg-yellow-400 text-[9px] font-bold rounded-full text-yellow-900 shadow border border-yellow-300 animate-pulse">Most Bought</span>}
                    </div>
                  </label>
                ))}
              </div>
              <Link href={"/Packages"} ><div className='text-sm mt-1.5 underline text-blue-600 font-bold'>Know about Package</div></Link>
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 mt-4 cursor-pointer">Next</button>
            </form>
          )}

          {step === 2 && (
            <form className="animate-fadeIn" onSubmit={e => { e.preventDefault(); handleNext(); }}>
              <label className="block mb-4 text-gray-700 font-semibold text-lg">Passenger Details</label>
              <div className="space-y-6 max-h-44  overflow-y-auto ">
                {passengers.map((p, idx) => (
                  <div key={idx} className="bg-indigo-50 rounded-lg p-2 flex items-center gap-5 shadow-sm">
                    <PassengerAvatar idx={idx} />
                    <div className="flex items-center gap-3 flex-col md:flex-row">
                      <div> <input type="text" name="name" placeholder="Name" value={p.name} onChange={e => handlePassengerChange(idx, e)} required className="border rounded px-3 py-2 w-[40vw] md:w-[6vw]" /></div>
                      <div> <input type="number" name="age" placeholder="Age" value={p.age} onChange={e => handlePassengerChange(idx, e)} required min={1} className="border rounded px-3 w-[40vw] md:w-[5vw] py-2 " /></div>
                      <div> <input type="tel" name="phone" placeholder="Phone Number" value={p.phone} onChange={e => handlePassengerChange(idx, e)} required className="border rounded px-3 py-2 w-[40vw] md:w-[8vw]" /></div>
                      <div onClick={() => { handleDelete(idx) }} className='cursor-pointer' ><lord-icon
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#2516c7,secondary:#2516c7"
                        style={{ "width": "25px", "height": "25px" }}
                      >
                      </lord-icon></div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setPassengers([...passengers, { ...initialPassenger }])} disabled={!CanAddPassenger()} className="mt-4 mb-6 bg-green-200 text-green-700 px-4 py-2 rounded hover:bg-green-300 cursor-pointer disabled:bg-green-100 ">+ Add Passenger</button>
              <div className="flex justify-between">
                <button type="button" onClick={handleBack} className="bg-gray-200 text-gray-700 py-2 px-6 rounded hover:bg-gray-300 cursor-pointer">Back</button>
                <button type="submit" disabled={!allPassengersValid} className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 cursor-pointer">Next</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="animate-fadeIn">
              <label className="block mb-4 text-gray-700 font-semibold text-lg">Review & Payment</label>

              <div className="bg-indigo-50 rounded-lg p-4 md:p-6 mb-6 shadow">
                <div><span className="md:font-semibold text-indigo-700">Date:</span> {travelDate}</div>
                <div><span className="md:font-semibold text-indigo-700">Destination:</span> {selectedLocation} (₹{selectedLocationObj?.price}/person)</div>
                <div><span className="md:font-semibold text-indigo-700">Package:</span> {selectedPackObj?.name}(₹{selectedPackObj?.price}/person)</div>
                <div><span className="md:font-semibold text-indigo-700">Passengers:</span>
                  <ul className="list-disc ml-6 mt-1 text-gray-700">
                    {passengers.map((p, idx) => (
                      <li key={idx}>{p.name} ({p.age} yrs, {p.phone})</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-lg font-bold text-indigo-800">Total: ₹{totalAmount}</div>
              </div>

              {/*  Coupon Section */}
              <div className="mb-4">
                {!showCouponInput ? (
                  <button
                    type="button"
                    onClick={() => setShowCouponInput(true)}
                    className="text-indigo-600 font-semibold underline cursor-pointer hover:text-green-700"
                  >
                    Do you have a coupon?
                  </button>
                ) : (
                  <div className="mt-4">
                    <label className="font-semibold text-indigo-700 block mb-1">Enter Coupon Code:</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-indigo-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-700"
                      >
                        Apply
                      </button>
                    </div>
                    {discount !== 0 && <div className="mt-2  text-sm md:text-lg font-bold text-green-700">
                      Coupon Applied! ₹{discount} discount
                    </div>}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button type="button" onClick={handleBack} className="bg-gray-200 text-gray-700 py-2 px-6 rounded hover:bg-gray-300 cursor-pointer">Back</button>
                <button type="submit" onClick={handlePayment} className="bg-green-600 text-white py-2 px-3 md:px-6 rounded hover:bg-green-700 font-semibold cursor-pointer">Proceed to Pay</button>
              </div>
            </form>
          )}
        </div>

        {/* Right Photo */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-gray-600 to-blue-300 text-white w-96 p-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Your Dream Trip Awaits</h2>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
                All-inclusive packages
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
                Trusted guides & experiences
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-white rounded-full"></span>
                24/7 support
              </li>
            </ul>
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <p className="font-semibold">Special Offer:</p>
              <p>Get <span className="font-bold">10% OFF</span> on your first booking!</p>
              <p>Use Code :<span className='text-gray-950 font-bold'> "FIRST"</span></p>
            </div>
          </div>
          <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Travel"
            width={400}
            height={400}
            className="rounded-lg shadow-lg mt-8"
          />

        </div>

      </div>
    </div>
  );
};

export default Page;




