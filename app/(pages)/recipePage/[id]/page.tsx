"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Loading from "@/app/loading";
const RecipePage = ({ params }: any) => {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const getRecipeById = async (id: any) => {
    try {
      const res = await fetch(`/api/recipes/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Tento recept neexistuje");
      }
      const data = await res.json();
      setRecipe(data.recipe);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Tento recept neexistuje");
    }
  };

  useEffect(() => {
    getRecipeById(params.id);
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (!recipe) {
    return <div>Recept neexistuje</div>;
  }

  return (
    <section className="mt-20 ">
      <div className="container">
        <h1 className="mb-10 font-bold text-center sm-clamp text-primary">
          {recipe.title}
        </h1>
        <div className="flex flex-col w-full gap-10 mb-10 md:mb-20 md:flex-row">
          <div className="flex flex-col gap-3 md:w-[50%] md:max-w-[50%] justify-center items-center md:justify-center sm:items-start w-full">
            <Image
              src={recipe.image}
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL={recipe.image}
              alt={`obrázek receptu ${recipe.title}`}
              className="object-cover w-full rounded-md"
            />
            <div className="flex justify-center sm:justify-between flex-wrap items-center w-full gap-5">
              <Link href={`/viewProfile/${recipe.author._id}`}>
                <div className="flex items-center gap-3 ">
                  <span>Vytvořil: </span>
                  <Avatar className=" h-[30px] w-[30px] sm:h-[60px] sm:w-[60px]">
                    <AvatarImage
                      alt="avatar"
                      className="object-cover rounded-lg "
                      src={recipe.author.profilePicture}
                    />
                    <AvatarFallback className=" size-full text-white bg-primary text-2xl font-semibold">
                      {recipe.author.name
                        ?.split(" ")
                        .map((word: any) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{recipe.author.name}</span>
                </div>
              </Link>
              <span>
                Doba na přípravu:{" "}
                <span className="text-primary">{recipe.time} minut</span>{" "}
              </span>
            </div>
          </div>
          <div
            className="flex flex-col gap-3 md:w-[50%] md:max-w-[50%]  items-center  w-full 
          "
          >
            <h3 className="text-center  sm-clamp text-primary">
              Popis receptu
            </h3>
            <p className="text-center sm:text-start">{recipe.desc}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 mb-20 md:flex-row">
          <div className="flex flex-col gap-3  text-center md:w-[50%] w-full">
            <h3 className="sm-clamp text-primary">Ingredience</h3>
            <ul className=" list-disc marker:text-primary list-inside">
              {recipe.ingredients.map((ingredient: any, i: any) => (
                <li key={i} className=" list-item text-center sm:text-start ">
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3  text-center md:w-[50%] w-full ">
            <h3 className="sm-clamp text-primary">Postup</h3>
            <ul className="flex flex-col gap-3">
              {recipe.procedure.map((proc: any, i: any) => (
                <li
                  key={i}
                  className="flex items-center sm:justify-start text-center sm:text-start justify-center gap-3"
                >
                  <span className="text-primary">{i + 1})</span>
                  <span>{proc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipePage;
