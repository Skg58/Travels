// app/api/razorpay-order/route.js
import Razorpay from 'razorpay';

const receiptId = `order_${Date.now()}`;

export async function POST(req) {
  const { totalAmount } = await req.json();
  // console.log(totalAmount + " AT RAZOR-ORDER");

  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: Number.parseInt(totalAmount*100), // ₹ in paise
    currency: 'INR',
    receipt: receiptId,
    // receipt: 'order_rcptid_001',
  };

  try {
    const order = await instance.orders.create(options);
    return Response.json(order);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
