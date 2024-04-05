import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { googleId, name, email, profilePicture } = await req.json();
  await connectDatabase();
  await User.create({ googleId, name, email, profilePicture });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}
