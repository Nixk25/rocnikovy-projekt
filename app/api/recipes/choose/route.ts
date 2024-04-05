import { connectDatabase } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  //@ts-ignore
  const category = req.nextUrl.searchParams.get("category");

  await connectDatabase();
  // Create object to search with
  const criteria = category ? { categories: category } : {};

  // Find recipes matching criteria and limit number of returned recipes
  let recipes: (typeof Recipe)[] | null = null;
  try {
    recipes = await Recipe.find(criteria).sort({ _id: -1 }).limit(4);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" });
  }

  // For each recipe, check if author is a valid ObjectId
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
          // Populate author if it is a valid ObjectId
          // @ts-ignore

          await recipe.populate("author");
        } else {
          // Find user using googleId if author is not a valid ObjectId
          // @ts-ignore

          const user = await User.findOne({ googleId: recipe.author });
          if (user) {
            // Assign found user to author if it exists
            // @ts-ignore

            recipe.author = user;
          } else {
            // Remove recipe with invalid author from array
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
