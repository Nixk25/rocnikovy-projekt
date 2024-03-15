import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatar from "../../../public/avatar.png";
import Link from "next/link";
const getRecipes = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/recipes`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("failed to fetch");
    }

    return res.json();
  } catch (err) {
    console.log("Error loading recipes", err);
  }
};

const Catalog = async () => {
  const { recipes } = await getRecipes();
  return (
    <section className="mt-20">
      <div className="container">
        <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-3 xl:grid-cols-4 xl:grid-rows-4 gap-5 place-items-center sm:place-items-start">
          {recipes.map((recipe: any, i: any) => (
            <Link href={`/recipePage/${recipe._id}`}>
              <Card
                key={i}
                className="p-0 overflow-hidden min-h-[330px] max-w-[300px]  w-fit  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
              >
                <CardHeader className="p-0 mb-5">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={300}
                    height={300}
                    className="object-cover max-h-[200px] w-[300px]"
                    placeholder="blur"
                    blurDataURL={recipe.image}
                  />
                </CardHeader>
                <CardContent className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                  <h3 className="text-lg font-semibold">{recipe.title}</h3>
                </CardContent>
                <CardFooter className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                  <div className="flex items-center gap-3">
                    <Avatar className=" h-[30px] w-[30px]">
                      <AvatarImage
                        alt="avatar"
                        className="rounded-lg object-cover "
                        src={recipe.authorProfilePicture || avatar}
                      />
                    </Avatar>
                    <span>{recipe.author}</span>
                  </div>
                  <span className="text-primary font-bold">
                    {recipe.time} minut
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
