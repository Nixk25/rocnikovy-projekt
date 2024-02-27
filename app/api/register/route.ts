import { NextResponse } from "next/server";
import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDatabase();
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "User registered" });
  } catch (error) {
    return NextResponse.json({ message: "error: " + error }, { status: 500 });
  }
}
