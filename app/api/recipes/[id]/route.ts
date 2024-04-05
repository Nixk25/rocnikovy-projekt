import { connectDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Recipe from "@/models/recipe";
import mongoose from "mongoose";
import User from "@/models/user";

export async function PUT(req: Request, { params }: any) {
  try {
    const { id } = params;
    const {
      //@ts-ignore
      newTitle: title,
      //@ts-ignore
      newDesc: desc,
      //@ts-ignore
      newIngredients: ingredients,
      //@ts-ignore
      newTime: time,
      //@ts-ignore
      newProcedure: procedure,
      //@ts-ignore
      newImage: image,
    } = await req.json();
    await connectDatabase();
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, {
      title,
      desc,
      ingredients,
      time,
      procedure,
      image,
    });
    if (!updatedRecipe) {
      return NextResponse.json("No recipe found", { status: 404 });
    }
    return NextResponse.json("Recipe updated", { status: 200 });
  } catch (error) {
    return NextResponse.json("Server error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: any) {
  const { id } = params;

  try {
    await connectDatabase();

    let recipe: typeof Recipe | null = null;
    try {
      recipe = await Recipe.findById(id).exec();
    } catch (error) {
      console.error(`[GET recipe/{id}] Error finding recipe:`, error);
      if (!recipe) {
        throw new Error("Recipe not found");
      }
    }

    if (!recipe) {
      throw new Error("Recipe is null");
    }

    let user: typeof User | null = null;
    // @ts-ignore

    if (mongoose.Types.ObjectId.isValid(recipe.author)) {
      // Search author by valid ObjectId
      try {
        // @ts-ignore
        user = await User.findById(recipe.author).exec();
      } catch (error) {
        console.error(`[GET recipe/{id}] Error finding user:`, error);
      }
    } else {
      // Search author by googleId if userId is not a valid ObjectId
      try {
        // @ts-ignore

        user = await User.findOne({ googleId: recipe.author }).exec();
      } catch (error) {
        console.error(`[GET recipe/{id}] Error finding user:`, error);
      }
    }

    if (!user) {
      throw new Error("User not found");
    }
    // @ts-ignore

    recipe.author = user;

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error(`[GET recipe/{id}] Unhandled exception:`, error);
    return NextResponse.json({ message: "Server error" });
  }
}
