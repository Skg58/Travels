import connectDb from "@/lib/connectdb";
import Receipt from "@/models/Receipt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("Debug: Session is null. Check NEXTAUTH_SECRET or Cookies.");
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session?.user?.email;
  try {
    await connectDb();
    const data = await Receipt.find({ email: email });
    return Response.json(data);
  } catch (error) {
    console.error("❌ DB save error:", error);
  }
}
