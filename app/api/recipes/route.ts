import { connectDatabase } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req: Request) {
  const {
    title,
    desc,
    categories,
    ingredients,
    author,
    time,
    procedure,
    image,
  } = await req.json();
  await connectDatabase();
  await Recipe.create({
    title,
    desc,
    categories,
    ingredients,
    author,
    time,
    procedure,
    image,
  });
  return NextResponse.json({ message: "Recipe created" }, { status: 201 });
}

export async function GET() {
  await connectDatabase();
  const recipes = await Recipe.find();
  return NextResponse.json({ recipes });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    throw new Error("Missing recipe id in request");
  }

  await connectDatabase();

  // Smazání receptu
  const deletedRecipe = await Recipe.findByIdAndDelete(id);
  if (!deletedRecipe) {
    throw new Error(`Recipe not found with id ${id}`);
  }

  const users = await User.find({ favoriteRecipes: id });

  for (const user of users) {
    if (!user.favoriteRecipes) {
      throw new Error(`User ${user._id} does not have favoriteRecipes`);
    }

    const index = user.favoriteRecipes.indexOf(id);
    if (index === -1) {
      throw new Error(
        `Recipe with id ${id} is not in user ${user._id}.favoriteRecipes`
      );
    }

    user.favoriteRecipes.splice(index, 1);
    await user.save();
  }

  return NextResponse.json({ message: "Recipe deleted" }, { status: 200 });
}
