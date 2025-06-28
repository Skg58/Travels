// app/api/save-user/route.js
import connectDb from '@/lib/connectdb';
import Receipt from '@/models/Receipt';


export async function POST(req) {
  const body = await req.json();

  const { travelDate, email, amount, Designation, pack, passengers, paymentId, orderId, signature } = body;
  try {
    await connectDb();

    const receipt = new Receipt({
      email: email,
      travelDate,
      Designation,
      pack,
      amount,
      passengers,
      paymentId,
      orderId,
      signature,
    });

    await receipt.save();

    return Response.json({ success: true });
  } catch (error) {
    console.error('❌ DB save error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save user' }), {
      status: 500,
    });
  }
}
