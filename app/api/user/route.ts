import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { name, email } = await req.json();
  await connectDatabase();
  await User.create({ name, email });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}
