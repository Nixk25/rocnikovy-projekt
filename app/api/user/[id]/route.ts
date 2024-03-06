import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  //@ts-ignore
  const {
    newName: name,
    newEmail: email,
    newProfilePicture: profilePicture,
  } = await req.json();
  await connectDatabase();
  await User.findByIdAndUpdate(id, {
    name,
    email,
    profilePicture,
  });
  return NextResponse.json({ message: "User edited" });
}

export async function GET(req: Request, { params }: any) {
  const { id } = params;
  await connectDatabase();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user });
}
