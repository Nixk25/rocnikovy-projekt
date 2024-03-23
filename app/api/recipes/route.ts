import { connectDatabase } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    title,
    desc,
    categories,
    ingredients,
    author,
    authorId,
    authorProfilePicture,
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
    authorId,
    authorProfilePicture,
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
  await connectDatabase();
  await Recipe.findByIdAndDelete(id);
  return NextResponse.json({ message: "Recipe deleted" }, { status: 200 });
}
