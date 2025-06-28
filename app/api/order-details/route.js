import connectDb from '@/lib/connectdb';
import Receipt from '@/models/Receipt';


export async function POST(req) {
  const body = await req.json();
  const {email}=body

  try {
    await connectDb();
    const data=await Receipt.find({email:email});
    return Response.json(data);

  } catch (error) {
    console.error('❌ DB save error:', error);
  }
}
