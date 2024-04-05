import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const { id } = params;

  await connectDatabase();

  let userWithFavorites: User | null = null;

  let query = {};
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { _id: id };
  } else {
    query = { googleId: id };
  }

  try {
    userWithFavorites = await User.findOne(query)
      .populate("favoriteRecipes")
      .catch((error) => {
        console.error("[GET /user/:id/favorites]", error);
        return null;
      });

    if (userWithFavorites && userWithFavorites.favoriteRecipes) {
      for (let i = 0; i < userWithFavorites.favoriteRecipes.length; i++) {
        if (
          mongoose.Types.ObjectId.isValid(
            userWithFavorites.favoriteRecipes[i].author
          )
        ) {
          await userWithFavorites.favoriteRecipes[i].populate("author");
        } else {
          const user = await User.findOne({
            googleId: userWithFavorites.favoriteRecipes[i].author,
          });
          userWithFavorites.favoriteRecipes[i].author = user;
        }
      }
    }

    if (!userWithFavorites) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("[GET /user/:id/favorites]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }

  for (const recipe of userWithFavorites.favoriteRecipes) {
    if (!recipe.author) {
      return NextResponse.json(
        { message: "Recipe author is null" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ user: userWithFavorites }, { status: 200 });
}
