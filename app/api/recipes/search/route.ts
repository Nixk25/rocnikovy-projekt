import { connectDatabase } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";
import removeAccents from "remove-accents";

export async function GET(req: Request) {
  //@ts-ignore
  const query = req.nextUrl.searchParams.get("query");
  //@ts-ignore
  const category = req.nextUrl.searchParams.get("category");

  await connectDatabase();

  const recipes = await Recipe.find().lean();
  const filteredRecipes = recipes.filter(
    (recipe) =>
      removeAccents(recipe.title)
        .toLowerCase()
        .includes(removeAccents(query).toLowerCase()) &&
      (!category || recipe.categories.includes(category)) // Upraveno
  );

  return NextResponse.json({ filteredRecipes });
}
