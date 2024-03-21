import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request, { params }: any) {
  //@ts-ignore
  const { userId } = await req.json();
  const { id } = params;

  //@ts-ignore

  const recipeId = id;
  await connectDatabase();
  let query = {};
  if (mongoose.Types.ObjectId.isValid(userId)) {
    query = { _id: userId };
  } else {
    query = { googleId: userId };
  }
  const user = await User.findOne(query);
  if (!user) {
    NextResponse.json({ message: "Uživatel neexistuje" });

    return;
  }

  if (!user.favoriteRecipes.includes(recipeId)) {
    user.favoriteRecipes.push(recipeId);
    await user.save();
    return NextResponse.json({ message: "Recept byl přidán" });
  } else {
    return NextResponse.json({ message: "Recept nelze přidat" });
  }
}

export async function DELETE(req: Request, { params }: any) {
  //@ts-ignore
  const { id } = params;
  //@ts-ignore
  const { userId } = await req.json();
  const recipeId = id;
  await connectDatabase();
  let query = {};
  if (mongoose.Types.ObjectId.isValid(userId)) {
    query = { _id: userId };
  } else {
    query = { googleId: userId };
  }
  const user = await User.findOne(query);
  const index = user.favoriteRecipes.indexOf(recipeId);

  if (index > -1) {
    user.favoriteRecipes.splice(index, 1);
    await user.save();
    return NextResponse.json({ message: "Recept byl odebrán" });
  }
}
