import React from "react";
import { toast } from "sonner";
import avatar from "../../../../public/avatar.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

const getUserById = async (id: any) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      toast.error("Tento uživatel neexistuje");
    }
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getMyRecipes = async (id: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/recipes/getById?userId=${id}`,
      { cache: "no-store" }
    );
    if (response.ok) {
      return await response.json();
    } else {
      console.log("Error:", response.status);
    }
  } catch (err) {
    console.log("Error getting user recipes", err);
  }
};

const ViewProfile = async ({ params }: any) => {
  const { id } = params;
  const { recipes } = await getMyRecipes(id);
  const { user } = await getUserById(id);
  const { name, email, profilePicture } = user;

  return (
    <section className=" my-[100px] ">
      <div className="container">
        <div className="mt-10 flex items-center gap-10 sm:flex-row flex-col sm:text-start text-center ">
          <Avatar className=" h-[200px] w-[200px]">
            <AvatarImage
              alt="avatar"
              className="rounded-lg object-cover "
              src={profilePicture || avatar}
            />
          </Avatar>

          <div className="flex flex-col gap-7">
            <h2 className="text-2xl font-semibold">Informace o účtu</h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <FaUser fill="#02b192" />
                <h3 className="text-lg font-semibold">Jméno:</h3>
                <p>{name}</p>
              </div>
              <div className="flex gap-3 items-center">
                <IoMdMail fill="#02b192" />
                <h3 className="text-lg font-semibold">Email:</h3>
                <p>{email}</p>
              </div>
            </div>
          </div>
        </div>
        <Tabs
          className="flex justify-start flex-col items-center sm:items-start mt-20 "
          defaultValue="recepty"
        >
          <TabsList className="flex flex-wrap bg-transparent ">
            <TabsTrigger value="recepty">Recepty tohoto uživatele</TabsTrigger>
            <TabsTrigger value="doporučujeme">Oblíbené recepty</TabsTrigger>
          </TabsList>
          <TabsContent value="recepty" className="w-full">
            <div className="flex justify-center sm:justify-start items-stretch  w-full gap-4 md:gap-10 py-5 flex-wrap ">
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
                    <CardContent className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <h3 className="text-lg font-semibold">{userRec.title}</h3>
                    </CardContent>
                    <CardFooter className=" flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
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
