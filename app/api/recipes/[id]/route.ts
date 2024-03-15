import { connectDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Recipe from "@/models/recipe";

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
      console.log(`No recipe found with id: ${id}`);
      return NextResponse.json("No recipe found", { status: 404 });
    }
    return NextResponse.json("Recipe updated", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Server error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: any) {
  const { id } = params;
  await connectDatabase();
  const recipe = await Recipe.findOne({ _id: id });
  return NextResponse.json({ recipe }, { status: 200 });
}
