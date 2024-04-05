"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaStar, FaFilter } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Catalog = () => {
  const [query, setQuery] = useState("");
  const { status, data: session } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchRecipes = async (query: string, category: string) => {
    const res = await fetch(
      `/api/recipes/search?query=${query}&category=${category}`
    );
    const data = await res.json();
    return data.filteredRecipes;
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
    searchRecipes(query || "", category).then((data) => {
      const recipesWithFavorites = data.map((recipe: any) => {
        const isFavorite = localStorage.getItem(recipe._id) !== null;
        return { ...recipe, isFavorite };
      });
      setIsLoading(false);
      setRecipes(recipesWithFavorites);
    });
  }, [query, category]);

  return (
    <section className="mt-20">
      <div className="container">
        <div className="flex flex-col items-center justify-center w-full ">
          <h1 className="mb-4 text-center sm-clamp">
            Vítejte v našem katalogu receptů
          </h1>
          <div className="flex flex-col items-center justify-center w-full h-full gap-5 mb-10 sm:flex-row">
            <div className="relative w-full sm:w-1/2">
              <Input
                id="recept"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Vyhledejte recept..."
                className="w-full transition-all ease-in-out duration-200"
              />
              {category !== "" && (
                <Badge
                  onClick={() => setCategory("")}
                  className="absolute flex items-center justify-center gap-2 text-white -translate-y-1/2 cursor-pointer bg-primary right-2 top-1/2"
                >
                  <span className="text-xs text-white font-extralight">X</span>
                  {category}
                </Badge>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center justify-center rounded-full size-10 bg-primary ">
                  <FaFilter fill="white" size={20} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-5 ">
                <DropdownMenuLabel>Filtrovat</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <RadioGroup
                  className="flex flex-col gap-5 py-2"
                  defaultValue={category}
                  onValueChange={setCategory}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="vše" />
                    <Label htmlFor="vše">Vše</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Maso" id="maso" />
                    <Label htmlFor="maso">Maso</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Vegan" id="vegan" />
                    <Label htmlFor="vegan">Vegan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Ryby" id="ryba" />
                    <Label htmlFor="ryba">Ryby</Label>
                  </div>
                </RadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isLoading ? (
          <div className="h-screen  flex-col gap-3 flex justify-center items-center">
            <span className="text-primary font-bold sm-clamp">Načítání...</span>
            <div className="loader"></div>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 mb-20 gap-5 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4  place-items-center sm:place-items-start">
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
                          src={recipe.author.profilePicture}
                        />
                        <AvatarFallback className="text-sm font-semibold text-white  size-full bg-primary">
                          {recipe.author.name
                            ?.split(" ")
                            .map((word: any) => word[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{recipe.author.name}</span>
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
