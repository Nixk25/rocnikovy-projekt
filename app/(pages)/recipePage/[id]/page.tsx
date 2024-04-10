"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Loading from "@/app/loading";
import { motion } from "framer-motion";
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
    <section className=" mt-28">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="container"
      >
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
            <div className="flex flex-wrap items-center justify-center w-full gap-5 sm:justify-between">
              <Link href={`/viewProfile/${recipe.author._id}`}>
                <div className="flex items-center gap-3 ">
                  <span>Vytvořil: </span>
                  <Avatar className=" h-[30px] w-[30px] sm:h-[60px] sm:w-[60px]">
                    <AvatarImage
                      alt="avatar"
                      className="object-cover rounded-lg "
                      src={recipe.author.profilePicture}
                    />
                    <AvatarFallback className="text-2xl font-semibold text-white size-full bg-primary">
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
            <h3 className="text-center sm-clamp text-primary">Popis receptu</h3>
            <p className="text-center sm:text-start">{recipe.desc}</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-10 mb-20 md:flex-row">
          <div className="flex flex-col gap-3  text-center md:w-[50%] w-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.5 }}
              className="sm-clamp text-primary"
            >
              Ingredience
            </motion.h3>
            <ul className="list-disc list-inside marker:text-primary">
              {recipe.ingredients.map((ingredient: any, i: any) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <li className="text-center list-item sm:text-start">
                    <span>{ingredient}</span>
                  </li>
                </motion.div>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3  text-center md:w-[50%] w-full ">
            <h3 className="sm-clamp text-primary">Postup</h3>
            <ul className="flex flex-col gap-3">
              {recipe.procedure.map((proc: any, i: any) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <li className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-start">
                    <span className="text-primary">{i + 1})</span>
                    <span>{proc}</span>
                  </li>
                </motion.div>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RecipePage;
