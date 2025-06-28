
import React from 'react'

export async function POST(request) {
  const body = await request.json();
  const { code ,totalAmount} = body;

  if (code === "FIRST") {
    return new Response(
      JSON.stringify({ valid: true, discountAmount: totalAmount * 0.10 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }else if (code === "NINTY") {
    return new Response(
      JSON.stringify({ valid: true, discountAmount: totalAmount * 0.90 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } else {
    return new Response(
      JSON.stringify({ valid: false }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
