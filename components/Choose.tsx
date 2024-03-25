"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface recipe {
  title: string;
  image: string;
  time: number;
  authorProfilePicture: string;
  author: string;
}

const Choose = () => {
  const [lastCreated, setLastCreated] = useState([]);
  const [meat, setMeat] = useState([]);
  const [vegan, setVegan] = useState([]);
  const [fish, setFish] = useState([]);

  const getRecipes = async (category: string) => {
    try {
      const res = await fetch(`/api/recipes/choose?category=${category}`);

      if (!res.ok) {
        throw new Error("failed to fetch");
      }

      return res.json();
    } catch (err) {
      console.log("Error loading recipes", err);
    }
  };

  useEffect(() => {
    getRecipes("").then((data) => setLastCreated(data.recipes));
    getRecipes("Maso").then((data) => setMeat(data.recipes));
    getRecipes("Vegan").then((data) => setVegan(data.recipes));
    getRecipes("Ryby").then((data) => setFish(data.recipes));
  }, []);

  return (
    <section className="w-full mt-12 mb-20">
      <div className="container">
        <header className="flex items-center justify-between w-full mb-5">
          <h2 className="text-3xl font-bold uppercase sm-clamp">Vyberte si!</h2>
          <Link
            href="/catalog"
            className="flex items-center justify-center transition-all cursor-pointer hover:text-primary all"
          >
            Zobrazit více
            <FaChevronRight />
          </Link>
        </header>
        <Tabs defaultValue="poslední">
          <TabsList className="flex flex-wrap mb-10 bg-transparent">
            <TabsTrigger value="poslední">Poslední přidané</TabsTrigger>
            <TabsTrigger value="maso">Maso</TabsTrigger>
            <TabsTrigger value="vegan">Vegan</TabsTrigger>
            <TabsTrigger value="ryby">Ryby</TabsTrigger>
          </TabsList>
          <TabsContent value="poslední">
            <ScrollArea className="flex items-center justify-center w-full">
              <div className="flex w-full gap-4 py-10 justify-evenly md:gap-10">
                {lastCreated.map((last: recipe, i) => (
                  <Link href={`/recipePage/${last._id}`}>
                    <Card
                      key={i}
                      className="p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
                    >
                      <CardHeader className="p-0 mb-5">
                        <Image
                          src={last.image}
                          alt={last.title}
                          className="object-cover max-h-[200px] w-[300px]"
                          width={200}
                          height={200}
                        />
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                        <h3 className="text-lg font-semibold">{last.title}</h3>
                      </CardContent>
                      <CardFooter className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                        <div className="flex items-center justify-center gap-3 ">
                          <Avatar className="flex justify-center items-center h-[30px] w-[30px] ">
                            <AvatarImage
                              alt="avatar"
                              className="object-cover rounded-full "
                              src={last.authorProfilePicture}
                            />
                            <AvatarFallback className="flex items-center justify-center text-sm font-semibold text-center text-white rounded-full size-full bg-primary">
                              {last.author
                                ?.split(" ")
                                .map((word: any) => word[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{last.author}</span>
                        </div>
                        <span className="font-bold text-primary">
                          {last.time} minut
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>

          <TabsContent value="maso">
            <ScrollArea className="w-full">
              <div className="flex w-full gap-4 py-10 justify-evenly md:gap-10">
                {meat.map((meat: recipe, i) => (
                  <Link href={`/recipePage/${meat._id}`}>
                    <Card
                      key={i}
                      className="p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
                    >
                      <CardHeader className="p-0 mb-5">
                        <Image
                          src={meat.image}
                          alt={meat.title}
                          className="object-cover max-h-[200px] w-[300px]"
                          width={200}
                          height={200}
                        />
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                        <h3 className="text-lg font-semibold">{meat.title}</h3>
                      </CardContent>
                      <CardFooter className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                        <div className="flex items-center gap-3">
                          <Avatar className=" flex justify-center items-center h-[30px] w-[30px]  ">
                            <AvatarImage
                              alt="avatar"
                              className="object-cover rounded-full "
                              src={meat.authorProfilePicture}
                            />
                            <AvatarFallback className="flex items-center justify-center text-sm font-semibold text-center text-white rounded-full size-full bg-primary">
                              {meat.author
                                ?.split(" ")
                                .map((word: any) => word[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{meat.author}</span>
                        </div>
                        <span className="font-bold text-primary">
                          {meat.time} minut
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="vegan">
            <ScrollArea className="w-full">
              <div className="flex w-full gap-4 py-10 justify-evenly md:gap-10">
                {vegan.map((veg: recipe, i) => (
                  <Link href={`/recipePage/${vegan._id}`}>
                    <Card
                      key={i}
                      className="p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
                    >
                      <CardHeader className="p-0 mb-5">
                        <Image
                          src={veg.image}
                          alt={veg.title}
                          className="object-cover max-h-[200px] w-[300px]"
                          width={200}
                          height={200}
                        />
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                        <h3 className="text-lg font-semibold">{veg.title}</h3>
                      </CardContent>
                      <CardFooter className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                        <div className="flex items-center gap-3">
                          <Avatar className=" flex justify-center items-center h-[30px] w-[30px]  ">
                            <AvatarImage
                              alt="avatar"
                              className="object-cover rounded-full "
                              src={veg.authorProfilePicture}
                            />
                            <AvatarFallback className="flex items-center justify-center text-sm font-semibold text-center text-white rounded-full size-full bg-primary">
                              {veg.author
                                ?.split(" ")
                                .map((word: any) => word[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{veg.author}</span>
                        </div>
                        <span className="font-bold text-primary">
                          {veg.time} minut
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="ryby">
            <ScrollArea className="w-full">
              <div className="flex w-full gap-4 py-10 justify-evenly md:gap-10">
                {fish.map((fish: recipe, i) => (
                  <Link href={`/recipePage/${fish._id}`}>
                    <Card
                      key={i}
                      className="p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
                    >
                      <CardHeader className="p-0 mb-5">
                        <Image
                          src={fish.image}
                          alt={fish.title}
                          className="object-cover max-h-[200px] w-[300px]"
                          width={200}
                          height={200}
                        />
                      </CardHeader>
                      <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                        <h3 className="text-lg font-semibold">{fish.title}</h3>
                      </CardContent>
                      <CardFooter className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                        <div className="flex items-center gap-3">
                          <Avatar className=" flex justify-center items-center h-[30px] w-[30px]  ">
                            <AvatarImage
                              alt="avatar"
                              className="object-cover rounded-full"
                              src={fish.authorProfilePicture}
                            />
                            <AvatarFallback className="flex items-center justify-center text-sm font-semibold text-center text-white rounded-full size-full bg-primary">
                              {fish.author
                                ?.split(" ")
                                .map((word: any) => word[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{fish.author}</span>
                        </div>
                        <span className="font-bold text-primary">
                          {fish.time} minut
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Choose;
