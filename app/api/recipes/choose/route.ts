import { connectDatabase } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  //@ts-ignore
  const category = req.nextUrl.searchParams.get("category");

  await connectDatabase();
  const criteria = category ? { categories: category } : {};

  let recipes: (typeof Recipe)[] | null = null;
  try {
    recipes = await Recipe.find(criteria).sort({ _id: -1 }).limit(4);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" });
  }

  if (recipes) {
    for (const recipe of recipes) {
      try {
        // @ts-ignore

        if (recipe.author === null || recipe.author === undefined) {
          // @ts-ignore

          console.error("Invalid author:", recipe.author);
          throw new Error("Invalid author");
        }
        // @ts-ignore

        if (mongoose.Types.ObjectId.isValid(recipe.author)) {
          // @ts-ignore

          await recipe.populate("author");
        } else {
          // @ts-ignore

          const user = await User.findOne({ googleId: recipe.author });
          if (user) {
            // @ts-ignore

            recipe.author = user;
          } else {
            // @ts-ignore

            recipes = recipes.filter((r) => r._id !== recipe._id);
          }
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" });
      }
    }
  }

  return NextResponse.json({ recipes: recipes || [] });
}
