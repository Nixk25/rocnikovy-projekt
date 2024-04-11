"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import avatar from "../../../public/avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
interface Recipe {
  _id: string;
  title: string;
  desc: string;
  ingredients: string;
  author: string;
  time: number;
  procedure: string;
  image: string;
}

const User = () => {
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const getMyRecipes = async () => {
    try {
      const response = await fetch(
        //@ts-ignore
        `/api/recipes/getById?userId=${session?.user?.id}`,
        { cache: "no-store" }
      );
      if (response.ok) {
        const data = await response.json();
        setUserRecipes(data.recipes);
        setLoading(false);
      } else {
        console.error("Error:", response.status);
      }
    } catch (err) {
      console.error("Error getting user recipes", err);
    }
  };

  const getFavoriteRecipes = async () => {
    //@ts-ignore
    if (!session || !session.user || !session.user.id) {
      console.error("Missing session or user id in getFavoriteRecipes");
      return;
    }

    try {
      //@ts-ignore
      const response = await fetch(`/api/user/${session.user.id}/favorites`);
      if (!response.ok) {
        console.error(
          `Error getting favorite recipes. Status: ${response.status}`
        );
        return;
      }

      const data = await response.json();
      if (data) {
        setFavoriteRecipes(data.user.favoriteRecipes);
      }
    } catch (err) {
      console.error("Error getting favorite recipes", err);
    }
  };

  useEffect(() => {
    if (status !== "loading") {
      getMyRecipes();
      getFavoriteRecipes();
    }
  }, [status]);

  const tabs = [
    {
      value: "recepty",
      name: "Vaše recepty",
    },
    {
      value: "oblíbené",
      name: "Oblíbené recepty",
    },
  ];
  return (
    <section className=" my-[100px] ">
      <div className="container">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="font-bold text-center sm-clamp sm:text-start"
        >
          Dobrý den, <span className="text-primary">{session?.user?.name}</span>
          !
        </motion.h1>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col items-center gap-10 mt-10 text-center sm:flex-row sm:text-start "
        >
          <Avatar className=" h-[200px] w-[200px]">
            <AvatarImage
              alt="avatar"
              className="object-cover rounded-lg "
              src={
                session?.user?.image ||
                //@ts-ignore
                session?.user?.profilePicture
              }
            />
            <AvatarFallback className="text-2xl font-semibold text-white size-full bg-primary">
              {session?.user?.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

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

              {/* @ts-ignore */}
              {session?.user?.provider !== "google" && (
                // @ts-ignore
                <Link href={`/editProfile/${session?.user.id}`}>
                  <Button className="text-white">Upravit váš profil</Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        <Tabs
          className="flex flex-col items-center justify-start mt-20 sm:items-start "
          defaultValue="recepty"
        >
          <TabsList className="flex flex-wrap mb-10 bg-transparent ">
            {tabs.map(({ name, value }, i) => (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
                key={i}
              >
                <TabsTrigger value={value}>{name}</TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
          <TabsContent value="recepty" className="w-full">
            {loading ? (
              <div className="container flex flex-col items-center justify-center gap-3">
                <span className="font-bold text-primary sm-clamp">
                  Načítání...
                </span>
                <div className="loader"></div>
              </div>
            ) : (
              <ScrollArea className="flex items-center  min-h-[400px] justify-center w-full ">
                <div className="flex w-full h-full gap-5 p-5 md:gap-10">
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
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }}
                        key={i}
                      >
                        <Card className=" p-0 overflow-hidden transition-all duration-200 ease-in-out border-none shadow-lg outline-none cursor-pointer group min-h-[350px] max-w-[300px] hover:scale-105">
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
                            <h3 className="text-lg font-semibold w-full">
                              {userRec.title}
                            </h3>
                          </CardContent>
                          <CardFooter className="flex flex-col items-center justify-between gap-2 text-center group-hover:hidden md:text-start md:gap-0 md:flex-row flexw">
                            <div className="flex items-center gap-3">
                              <Avatar className=" h-[50px] w-[50px]">
                                <AvatarImage
                                  alt="avatar"
                                  className="object-cover rounded-lg "
                                  //@ts-ignore
                                  src={userRec.author.profilePicture}
                                />
                              </Avatar>
                              {/* @ts-ignore */}
                              <span>{userRec.author.name}</span>
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
                      </motion.div>
                    ))
                  )}
                  {userRecipes.length > 0 ? (
                    <Link href="/addNewRecipe">
                      <Card className="p-0 bg-accent overflow-hidden h-full text-center flex justify-center items-center flex-col gap-5 w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg ease-in-out duration-200">
                        <p>Vytvořte nový recept</p>
                        <Button className="text-lg font-bold text-white">
                          +
                        </Button>
                      </Card>
                    </Link>
                  ) : null}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
          </TabsContent>
          <TabsContent value="oblíbené" className="w-full">
            <ScrollArea className="flex items-center  min-h-[400px] justify-center w-full ">
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
                    return (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }}
                        key={i}
                      >
                        <Card className="group p-0 overflow-hidden w-[300px] h-max  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg ease-in-out duration-200">
                          <Link href={`/recipePage/${recipe._id}`}>
                            <CardHeader className="p-0 mb-5">
                              <Image
                                src={recipe.image}
                                alt={recipe.title}
                                width={300}
                                height={200}
                                className="object-cover h-max"
                              />
                            </CardHeader>
                          </Link>
                          <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                            <h3 className="text-lg font-semibold">
                              {recipe.title}
                            </h3>
                          </CardContent>
                          <CardFooter className="flex flex-col items-center justify-between gap-2 text-center group-hover:hidden md:text-start md:gap-0 md:flex-row">
                            <div className="flex items-center gap-3">
                              <Avatar className=" h-[50px] w-[50px]">
                                <AvatarImage
                                  alt="avatar"
                                  className="object-cover rounded-lg "
                                  //@ts-ignore
                                  src={recipe.author.profilePicture}
                                />
                              </Avatar>
                              {/* @ts-ignore */}
                              <span>{recipe.author.name}</span>
                            </div>
                            <span className="font-bold text-primary">
                              {recipe.time} minut
                            </span>
                          </CardFooter>
                          <CardFooter className="items-center justify-center hidden gap-5 group-hover:flex">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <RemoveBtnFavorite
                                    // @ts-ignore
                                    userId={session?.user?.id}
                                    id={recipe._id}
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="text-white bg-red-500">
                                  Smažte tento recept z oblíbených
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default User;
