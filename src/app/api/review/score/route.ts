import { NextResponse } from "next/server";
import { scorePrescription } from "@/lib/firebase/functions";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await scorePrescription(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

