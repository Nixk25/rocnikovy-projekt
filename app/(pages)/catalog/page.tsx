"use client";

import React, { useState, useEffect } from "react";
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

import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const Catalog = () => {
  const [query, setQuery] = useState("");
  const { status, data: session } = useSession();
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async (query: string) => {
    const res = await fetch(`/api/recipes/search?query=${query}`);
    const data = await res.json();
    console.log(data.recipes);
    return data.recipes;
  };

  const toggleFavorite = async (id: any) => {
    //@ts-ignore
    const recipeToUpdate = recipes.find((recipe) => recipe._id === id);
    //@ts-ignore
    recipeToUpdate.isFavorite = !recipeToUpdate.isFavorite;
    //@ts-ignore
    const method = recipeToUpdate.isFavorite ? "POST" : "DELETE";

    if (!session?.user?.id) {
      toast.error("Uživatel nebyl nalezen", {
        description: "Musíte být příhlášení",
      });
      return;
    }

    const response = await fetch(`/api/recipes/favorite/${id}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      //@ts-ignore
      body: JSON.stringify({ userId: session?.user?.id }),
    });

    if (response.ok) {
      if (method === "POST") {
        toast.success("Recept byl přidán do oblíbených");
        localStorage.setItem(id, "true");
      } else {
        toast.success("Recept byl odebrán z oblíbených");
        localStorage.removeItem(id);
      }
      setRecipes([...recipes]);
    } else {
      if (method === "POST") {
        toast.error("Nepovedlo se přidat recept do oblíbených");
      } else {
        toast.error("Nepovedlo se odebrat recept z oblíbených");
      }
    }
  };

  useEffect(() => {
    if (query !== "") {
      searchRecipes(query).then((data) => {
        console.log(data);
        const recipesWithFavorites = data.map((recipe: any) => {
          const isFavorite = localStorage.getItem(recipe._id) !== null;
          return { ...recipe, isFavorite };
        });
        setRecipes(recipesWithFavorites);
      });
    } else {
      getRecipes().then((data) => {
        const recipesWithFavorites = data.recipes.map((recipe: any) => {
          const isFavorite = localStorage.getItem(recipe._id) !== null;
          return { ...recipe, isFavorite };
        });
        setRecipes(recipesWithFavorites);
      });
    }
  }, [query]);
  return (
    <section className="mt-20">
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full ">
          <h1 className="mb-4 text-center sm-clamp">
            Vítejte v našem katalogu receptů
          </h1>
          <Input
            id="recept"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Vyhledejte recept..."
            className="mb-5 max-w-[50%]"
          />
        </div>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 grid-rows-1 gap-5 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-3 xl:grid-cols-4 xl:grid-rows-4 place-items-center sm:place-items-start">
            {recipes.map((recipe: any, i: any) => {
              return (
                <Card
                  key={i}
                  className="p-0 overflow-hidden min-h-[330px] max-w-[300px]  w-fit  hover:scale-105 transition-all cursor-pointer border-none outline-none group shadow-lg"
                >
                  <Link href={`/recipePage/${recipe._id}`}>
                    <CardHeader className="p-0 mb-5">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={300}
                        height={300}
                        className="object-cover max-h-[200px] group-hover:scale-105 transition-all ease-in duration-200 w-[300px]"
                        placeholder="blur"
                        blurDataURL={recipe.image}
                      />
                    </CardHeader>
                  </Link>

                  <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                    <h3 className="text-lg font-semibold">{recipe.title}</h3>
                    {status === "authenticated" && (
                      <button onClick={() => toggleFavorite(recipe._id)}>
                        {recipe.isFavorite ? (
                          <FaStar size={20} fill="yellow" />
                        ) : (
                          <CiStar size={20} color="grey" />
                        )}
                      </button>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                    <div className="flex items-center gap-3">
                      <Avatar className=" h-[30px] w-[30px]">
                        <AvatarImage
                          alt="avatar"
                          className="object-cover rounded-lg "
                          src={recipe.authorProfilePicture || avatar}
                        />
                      </Avatar>
                      <span>{recipe.author}</span>
                    </div>
                    <span className="font-bold text-primary">
                      {recipe.time} minut
                    </span>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="container flex flex-col items-center justify-center w-full h-screen gap-3">
            <p>Nebyl nalezen žádný takový recept</p>
            <Link href="/addNewRecipe">
              <Button className="text-white">Přidejte nový recept</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
