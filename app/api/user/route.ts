import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { googleId, name, email } = await req.json();
  console.log(googleId, name, email);
  await connectDatabase();
  await User.create({ googleId, name, email });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}
