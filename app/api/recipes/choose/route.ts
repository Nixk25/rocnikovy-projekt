import { connectDatabase } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  //@ts-ignore
  const category = req.nextUrl.searchParams.get("category");
  await connectDatabase();

  // Vytvořte objekt kritérií pro vyhledávání
  const criteria = category ? { categories: category } : {};

  // Najděte recepty, které odpovídají kritériím, a omezte počet vrácených receptů
  const recipes = await Recipe.find(criteria).sort({ _id: -1 }).limit(4);

  return NextResponse.json({ recipes });
}
