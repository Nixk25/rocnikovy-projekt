import { connectDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Recipe from "@/models/recipe";

export async function GET(req: any) {
  const userId = req.nextUrl.searchParams.get("userId");
  await connectDatabase();
  const recipes = await Recipe.find({ authorId: userId });
  return NextResponse.json({ recipes });
}
