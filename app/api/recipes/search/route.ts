import { connectDatabase } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import User from "@/models/user";
import mongoose from "mongoose";
import removeAccents from "remove-accents";
import { NextResponse } from "next/server";

interface Recipe {
  _id: string;
  title: string;
  desc: string;
  categories: string[];
  ingredients: string[];
  author: string;
  time: number;
  procedure: string[];
  image: string;
}
export async function GET(req: Request) {
  //@ts-ignore
  const query = req.nextUrl.searchParams.get("query");
  //@ts-ignore
  const category = req.nextUrl.searchParams.get("category");

  let recipes: Recipe[] | null;
  try {
    await connectDatabase();
  } catch (error) {
    return NextResponse.json({ message: "Server error" });
  }

  const criteria = category ? { categories: category } : {};

  try {
    recipes = await Recipe.find(criteria).sort({ _id: -1 }).exec();
  } catch (error) {
    return NextResponse.json({ message: "Server error" });
  }

  const filteredRecipes = recipes.filter(
    (recipe) =>
      removeAccents(recipe.title)
        .toLowerCase()
        .includes(removeAccents(query).toLowerCase()) &&
      (!category || recipe.categories.includes(category))
  );

  for (const recipe of filteredRecipes) {
    if (!recipe.author) {
      throw new Error("Invalid author: " + recipe.author);
    }

    try {
      if (mongoose.Types.ObjectId.isValid(recipe.author)) {
        //@ts-ignore
        await recipe.populate("author");
      } else {
        const user = await User.findOne({ googleId: recipe.author }).exec();
        if (!user) {
          throw new Error("User not found: " + recipe.author);
        }
        recipe.author = user;
      }
    } catch (error) {
      return NextResponse.json({ message: "Server error" });
    }
  }

  return NextResponse.json({ filteredRecipes });
}
