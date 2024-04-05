"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/app/loading";

const ViewProfile = ({ params }: any) => {
  const { id } = params;
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    const getUserById = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          toast.error("Tento uživatel neexistuje");
        }
        const userData = await res.json();
        setUser(userData.user);
        const authorId = userData.user.googleId
          ? userData.user.googleId
          : userData.user._id;
        setAuthor(authorId);

        getMyRecipes(authorId);
      } catch (err) {
        console.error(err);
      }
    };

    const getMyRecipes = async (authorId: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/recipes/getById?userId=${authorId}`,
          { cache: "no-store" }
        );
        if (response.ok) {
          const recipeData = await response.json();
          setRecipes(recipeData.recipes);
        } else {
          console.error("Error:", response.status);
        }
      } catch (err) {
        console.error("Error getting user recipes", err);
      }
    };

    getUserById();
  }, [id]);

  if (!user || !recipes) {
    return <Loading />;
  }

  const { name, email, profilePicture } = user;

  return (
    <section className=" my-[100px] ">
      <div className="container">
        <div className="flex flex-col items-center gap-10 mt-10 text-center sm:flex-row sm:text-start ">
          <Avatar className=" h-[200px] w-[200px]">
            <AvatarImage
              alt="avatar"
              className="object-cover rounded-lg "
              src={profilePicture}
            />
            <AvatarFallback className=" size-full text-white bg-primary text-2xl font-semibold">
              {name
                ?.split(" ")
                .map((word: any) => word[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-7">
            <h2 className="text-2xl font-semibold">Informace o účtu</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaUser fill="#02b192" />
                <h3 className="text-lg font-semibold">Jméno:</h3>
                <p>{name}</p>
              </div>
              <div className="flex items-center gap-3">
                <IoMdMail fill="#02b192" />
                <h3 className="text-lg font-semibold">Email:</h3>
                <p>{email}</p>
              </div>
            </div>
          </div>
        </div>
        <Tabs
          className="flex flex-col items-center justify-start mt-20 sm:items-start "
          defaultValue="recepty"
        >
          <TabsList className="flex flex-wrap bg-transparent ">
            <TabsTrigger value="recepty">Recepty tohoto uživatele</TabsTrigger>
          </TabsList>
          <TabsContent value="recepty" className="w-full">
            <div className="flex flex-wrap items-stretch justify-center w-full gap-4 py-5 sm:justify-start md:gap-10 ">
              {recipes.map((userRec: any, i: any) => (
                //@ts-ignore
                <Link href={`/recipePage/${userRec._id}`}>
                  <Card
                    key={i}
                    className=" p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg ease-in-out duration-200"
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
                    <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                      <h3 className="text-lg font-semibold">{userRec.title}</h3>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center justify-between gap-2 text-center  md:text-start md:gap-0 md:flex-row">
                      <div className="flex items-center gap-3">
                        <Avatar className=" h-[50px] w-[50px]">
                          <AvatarImage
                            alt="avatar"
                            className="object-cover rounded-lg "
                            src={userRec.author.profilePicture}
                          />
                          <AvatarFallback className=" size-full text-white bg-primary text-2xl font-semibold">
                            {name
                              ?.split(" ")
                              .map((word: any) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{userRec.author.name}</span>
                      </div>
                      <span className="font-bold text-primary">
                        {userRec.time} minut
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ViewProfile;
