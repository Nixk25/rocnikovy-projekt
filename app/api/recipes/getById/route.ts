import { connectDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Recipe from "@/models/recipe";
import User from "@/models/user";
import mongoose from "mongoose";

export async function GET(req: any) {
  const userId = req.nextUrl.searchParams.get("userId");

  await connectDatabase();

  let recipes: Recipe[] | null = null;
  try {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      recipes = await Recipe.find({ author: userId })
        .populate("author")
        .catch((error) => {
          throw error;
        });
    } else {
      const user = await User.findOne({ googleId: userId }).catch((error) => {
        throw error;
      });
      if (user) {
        recipes = await Recipe.find({ author: user.googleId })
          .catch((error) => {
            throw error;
          })
          .then((recipesFound) => {
            if (recipesFound) {
              recipesFound.forEach((recipe) => {
                recipe.author = user;
              });
              return recipesFound;
            } else {
              return null;
            }
          })
          .catch((error) => {
            throw error;
          });
      } else {
        return NextResponse.json({ message: "User not found " });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" });
  }

  if (recipes === null) {
    return NextResponse.json({ message: "Recipes not found" });
  }

  return NextResponse.json({ recipes });
}
