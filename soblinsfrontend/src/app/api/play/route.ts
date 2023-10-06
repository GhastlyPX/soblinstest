import { BET_URL } from "@/constants/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  try {
    const response = await fetch(BET_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: res.location,
        serializedTx: res.serializedTx,
      }),
    });
    const body = await response.json();
    if (response.ok) {
      return NextResponse.json({ message: body.message });
    } else if (response.status === 400) {
      return new Response(
        JSON.stringify({ message: body.message, name: body.name }),
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "An unknown error occured", name: "unknown" }),
      {
        status: 400,
      }
    );
  }
}
