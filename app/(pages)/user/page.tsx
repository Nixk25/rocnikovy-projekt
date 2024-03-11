"use client";

import React from "react";
import { useSession } from "next-auth/react";
import avatar from "../../../public/avatar.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoIosStar } from "react-icons/io";
import firstImage from "../../../public/first-img.png";
import secondImage from "../../../public/second-img.png";
import thirdImage from "../../../public/third-img.png";
import fourthImage from "../../../public/fourth-img.png";

export interface recipe {
  name: string;
  img: StaticImageData;
  time: string;
  stars: number;
}

const popular: recipe[] = [
  {
    name: "Těstoviny Aglio",
    img: firstImage,
    time: "5-10 min",
    stars: 3.7,
  },
  {
    name: "Kuře na česneku",
    img: secondImage,
    time: "2-3 hodiny",
    stars: 4.8,
  },
  {
    name: "Domácí lasagne",
    img: thirdImage,
    time: "30 min",
    stars: 4.5,
  },
  {
    name: "Snídaňové lívance",
    img: fourthImage,
    time: "20 min",
    stars: 4.1,
  },
];

const User = () => {
  const { status, data: session } = useSession();
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
          <TabsContent value="recepty">
            <div className="flex justify-evenly w-full gap-4 md:gap-10 py-5 flex-wrap">
              {popular.map((pop, i) => (
                <Card
                  key={i}
                  className="p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
                >
                  <CardHeader className="p-0 mb-5">
                    <Image
                      src={pop.img}
                      alt={pop.name}
                      className="object-cover max-h-[200px] w-[300px]"
                      placeholder="blur"
                    />
                  </CardHeader>
                  <CardContent className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                    <h3 className="text-lg font-semibold">{pop.name}</h3>
                    <div className="flex gap-1 justify-center items-center">
                      <span>{pop.stars}</span>
                      <IoIosStar color="#f4d301" fill="#f4d301" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                    <span className="text-primary font-bold">{pop.time}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default User;
