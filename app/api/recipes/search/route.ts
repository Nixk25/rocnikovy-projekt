import { connectDatabase } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  //@ts-ignore
  const query = req.nextUrl.searchParams.get("query");

  await connectDatabase();

  const recipes = await Recipe.find({
    title: { $regex: new RegExp(query, "i") },
  });

  return NextResponse.json({ recipes });
}
