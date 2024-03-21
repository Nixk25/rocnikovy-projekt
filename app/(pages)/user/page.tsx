"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import avatar from "../../../public/avatar.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RemoveBtn from "@/components/RemoveBtn";
import UpdateBtn from "@/components/UpdateBtn";
import RemoveBtnFavorite from "@/components/RemoveBtnFavorite";
interface Recipe {
  title: string;
  desc: string;
  ingredients: string;
  author: string;
  authorId: string;
  authorProfilePicture: string;
  time: number;
  procedure: string;
  image: string;
}

const User = () => {
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const { status, data: session } = useSession();
  const getMyRecipes = async () => {
    try {
      const response = await fetch(
        //@ts-ignore
        `/api/recipes/getById?userId=${session.user.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserRecipes(data.recipes);
      } else {
        console.log("Error:", response.status);
      }
    } catch (err) {
      console.log("Error getting user recipes", err);
    }
  };

  const getFavoriteRecipes = async () => {
    try {
      //@ts-ignore
      const response = await fetch(`/api/user/${session?.user?.id}/favorites`);
      if (response.ok) {
        const favoriteRecipeIds = await response.json();
        const favoriteRecipes = await Promise.all(
          favoriteRecipeIds.map(async (recipeId: any) => {
            const response = await fetch(`/api/recipes/${recipeId}`);
            if (response.ok) {
              return response.json();
            } else {
              console.error(`Failed to fetch recipe with id ${recipeId}`);
              return null;
            }
          })
        );
        setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe !== null));
      } else {
        console.log("Error:", response.status);
      }
    } catch (err) {
      console.log("Error getting favorite recipes", err);
    }
  };

  useEffect(() => {
    if (status !== "loading") {
      getMyRecipes();
      getFavoriteRecipes();
    }
  }, [status]);

  return (
    <section className=" my-[100px] ">
      <div className="container">
        <h1 className="font-bold text-center sm-clamp sm:text-start">
          Dobrý den, <span className="text-primary">{session?.user?.name}</span>
          !
        </h1>
        <div className="flex flex-col items-center gap-10 mt-10 text-center sm:flex-row sm:text-start ">
          {status === "authenticated" ? (
            <Avatar className=" h-[200px] w-[200px]">
              <AvatarImage
                alt="avatar"
                className="object-cover rounded-lg "
                src={
                  session?.user?.image ||
                  //@ts-ignore
                  session?.user?.profilePicture ||
                  avatar
                }
              />
            </Avatar>
          ) : (
            <Image src={avatar} className="rounded-lg " alt="avatar" />
          )}

          <div className="flex flex-col gap-7">
            <h2 className="text-2xl font-semibold">Informace o vašem účtu</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaUser fill="#02b192" />
                <h3 className="text-lg font-semibold">Vaše jméno:</h3>
                <p>{session?.user?.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <IoMdMail fill="#02b192" />
                <h3 className="text-lg font-semibold">Email:</h3>
                <p>{session?.user?.email}</p>
              </div>

              {session?.user?.provider !== "google" && (
                //@ts-ignore

                <Link href={`/editProfile/${session?.user.id}`}>
                  <Button className="text-white">Upravit váš profil</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <Tabs
          className="flex flex-col items-center justify-start mt-20 sm:items-start "
          defaultValue="recepty"
        >
          <TabsList className="flex flex-wrap bg-transparent ">
            <TabsTrigger value="recepty">Tvoje recepty</TabsTrigger>
            <TabsTrigger value="oblíbené">Oblíbené recepty</TabsTrigger>
          </TabsList>
          <TabsContent value="recepty" className="w-full">
            <div className="flex flex-wrap items-stretch justify-center w-full gap-4 py-5 sm:justify-start md:gap-10 ">
              {userRecipes.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full gap-5">
                  <p>Zatím nemáte vytvořené žádné recepty..😢</p>
                  <Link href="/addNewRecipe">
                    <Button className="text-white">
                      {" "}
                      Vytvořit nový recept
                    </Button>
                  </Link>
                </div>
              ) : (
                userRecipes.map((userRec, i) => (
                  //@ts-ignore
                  <Card
                    key={i}
                    className="group p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg ease-in-out duration-200"
                  >
                    <Link href={`/recipePage/${userRec._id}`}>
                      <CardHeader className="p-0 mb-5">
                        <Image
                          src={userRec.image}
                          alt={userRec.title}
                          width={300}
                          height={300}
                          className="object-cover max-[300px] w-[300px]"
                          placeholder="blur"
                          blurDataURL={userRec.image}
                        />
                      </CardHeader>
                    </Link>
                    <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                      <h3 className="text-lg font-semibold">{userRec.title}</h3>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center justify-between gap-2 text-center group-hover:hidden md:text-start md:gap-0 md:flex-row">
                      <div className="flex items-center gap-3">
                        <Avatar className=" h-[50px] w-[50px]">
                          <AvatarImage
                            alt="avatar"
                            className="object-cover rounded-lg "
                            src={userRec.authorProfilePicture}
                          />
                        </Avatar>
                        <span>{userRec.author}</span>
                      </div>
                      <span className="font-bold text-primary">
                        {userRec.time} minut
                      </span>
                    </CardFooter>
                    <CardFooter className="items-center justify-center hidden gap-5 group-hover:flex">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Link href={`/updateRecipe/${userRec._id}`}>
                              <UpdateBtn />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent className="text-white bg-primary">
                            Upravte svůj recept
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <RemoveBtn id={userRec._id} />
                          </TooltipTrigger>
                          <TooltipContent className="text-white bg-red-500">
                            Smažte tento recept
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="oblíbené" className="w-full">
            <div className="flex flex-wrap items-stretch justify-center w-full gap-4 py-5 sm:justify-start md:gap-10 ">
              {favoriteRecipes.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full gap-5">
                  <p>Zatím nemáte žádné oblíbené recepty..😢</p>
                  <Link href="/catalog">
                    <Button className="text-white">
                      {" "}
                      Prohlídněte si náš katalog
                    </Button>
                  </Link>
                </div>
              ) : (
                favoriteRecipes.map((recipe, i) => {
                  //@ts-ignore
                  const favRecipe = recipe.recipe;
                  return (
                    <Card
                      key={i}
                      className="group p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg ease-in-out duration-200"
                    >
                      <Link href={`/recipePage/${favRecipe._id}`}>
                        <CardHeader className="p-0 mb-5">
                          <Image
                            src={favRecipe.image}
                            alt={favRecipe.title}
                            width={300}
                            height={300}
                            className="object-cover max-[300px] w-[300px]"
                            placeholder="blur"
                            blurDataURL={favRecipe.image}
                          />
                        </CardHeader>
                      </Link>
                      <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                        <h3 className="text-lg font-semibold">
                          {favRecipe.title}
                        </h3>
                      </CardContent>
                      <CardFooter className="flex flex-col items-center justify-between gap-2 text-center group-hover:hidden md:text-start md:gap-0 md:flex-row">
                        <div className="flex items-center gap-3">
                          <Avatar className=" h-[50px] w-[50px]">
                            <AvatarImage
                              alt="avatar"
                              className="object-cover rounded-lg "
                              src={favRecipe.authorProfilePicture}
                            />
                          </Avatar>
                          <span>{favRecipe.author}</span>
                        </div>
                        <span className="font-bold text-primary">
                          {favRecipe.time} minut
                        </span>
                      </CardFooter>
                      <CardFooter className="items-center justify-center hidden gap-5 group-hover:flex">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <RemoveBtnFavorite
                                userId={session?.user?.id}
                                id={favRecipe._id}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="text-white bg-red-500">
                              Smažte tento recept z oblíbených
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardFooter>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default User;
