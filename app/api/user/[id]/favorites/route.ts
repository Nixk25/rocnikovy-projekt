import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: any) {
  const { id } = params;
  await connectDatabase();
  let query = {};
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { _id: id };
  } else {
    query = { googleId: id };
  }
  const user = await User.findOne(query);
  return NextResponse.json(user.favoriteRecipes, { status: 200 });
}
