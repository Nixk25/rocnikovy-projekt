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
  useEffect(() => {
    if (status !== "loading") {
      getMyRecipes();
    }
  }, [status]);

  return (
    <section className=" my-[100px] ">
      <div className="container">
        <h1 className="sm-clamp font-bold sm:text-start text-center">
          Dobrý den, <span className="text-primary">{session?.user?.name}</span>
          !
        </h1>
        <div className="mt-10 flex items-center gap-10 sm:flex-row flex-col sm:text-start text-center ">
          {status === "authenticated" ? (
            <Avatar className=" h-[200px] w-[200px]">
              <AvatarImage
                alt="avatar"
                className="rounded-lg object-cover "
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
              <div className="flex gap-3 items-center">
                <FaUser fill="#02b192" />
                <h3 className="text-lg font-semibold">Vaše jméno:</h3>
                <p>{session?.user?.name}</p>
              </div>
              <div className="flex gap-3 items-center">
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
          className="flex justify-start flex-col items-center sm:items-start mt-20 "
          defaultValue="recepty"
        >
          <TabsList className="flex flex-wrap bg-transparent ">
            <TabsTrigger value="recepty">Tvoje recepty</TabsTrigger>
            <TabsTrigger value="doporučujeme">Oblíbené recepty</TabsTrigger>
          </TabsList>
          <TabsContent value="recepty" className="w-full">
            <div className="flex justify-center sm:justify-start items-stretch  w-full gap-4 md:gap-10 py-5 flex-wrap ">
              {userRecipes.length === 0 ? (
                <div className="flex justify-center items-center flex-col w-full gap-5">
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
                  <Link href={`/recipePage/${userRec._id}`}>
                    <Card
                      key={i}
                      className="group p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg ease-in-out duration-200"
                    >
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
                      <CardContent className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                        <h3 className="text-lg font-semibold">
                          {userRec.title}
                        </h3>
                      </CardContent>
                      <CardFooter className="group-hover:hidden flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                        <div className="flex items-center gap-3">
                          <Avatar className=" h-[50px] w-[50px]">
                            <AvatarImage
                              alt="avatar"
                              className="rounded-lg object-cover "
                              src={userRec.authorProfilePicture}
                            />
                          </Avatar>
                          <span>{userRec.author}</span>
                        </div>
                        <span className="text-primary font-bold">
                          {userRec.time} minut
                        </span>
                      </CardFooter>
                      <CardFooter className="hidden group-hover:flex justify-center items-center gap-5">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Link href={`/updateRecipe/${userRec._id}`}>
                                <UpdateBtn />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-primary text-white">
                              Upravte svůj recept
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <RemoveBtn id={userRec._id} />
                            </TooltipTrigger>
                            <TooltipContent className="bg-red-500 text-white">
                              Smažte tento recept
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardFooter>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default User;
