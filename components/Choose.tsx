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
import { motion } from "framer-motion";
interface Recipe {
  _id: string;
  title: string;
  desc: string;
  categories: string[];
  ingredients: string[];
  author: string;
  time: number;
  procedure: string[];
  image: string;
}

const Choose = () => {
  const [lastCreated, setLastCreated] = useState<Recipe[]>([]);
  const [meat, setMeat] = useState<Recipe[]>([]);
  const [vegan, setVegan] = useState<Recipe[]>([]);
  const [fish, setFish] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categories = [
    {
      name: "Poslední přidané",
      value: "poslední",
    },
    {
      name: "Maso",
      value: "maso",
    },
    {
      name: "Vegan",
      value: "vegan",
    },
    {
      name: "Ryby",
      value: "ryby",
    },
  ];
  const getRecipes = async (category: string) => {
    try {
      const res = await fetch(`/api/recipes/choose?category=${category}`);

      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      setIsLoading(false);
      return res.json();
    } catch (err) {
      console.error("Error loading recipes", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipes("").then((data) => {
      setLastCreated(data.recipes);
    });
    getRecipes("Maso").then((data) => {
      setMeat(data.recipes);
    });
    getRecipes("Vegan").then((data) => {
      setVegan(data.recipes);
    });
    getRecipes("Ryby").then((data) => {
      setFish(data.recipes);
    });
  }, []);

  return (
    <section className="w-full mt-12 mb-20">
      <div className="container">
        <header className="flex items-center justify-between w-full mb-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="font-bold uppercase sm-clamp"
          >
            Vyberte si!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.5 }}
            viewport={{ once: true, amount: 1 }}
          >
            <Link
              href="/catalog"
              className="flex items-center justify-center transition-all cursor-pointer hover:text-primary all"
            >
              Zobrazit více
              <FaChevronRight />
            </Link>
          </motion.div>
        </header>
        {isLoading ? (
          <div className="container flex flex-col items-center justify-center gap-3">
            <span className="font-bold text-primary sm-clamp">Načítání...</span>
            <div className="loader"></div>
          </div>
        ) : (
          <Tabs defaultValue="poslední">
            <TabsList className="flex flex-wrap mb-10 bg-transparent">
              {categories.map(({ name, value }, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                  key={i}
                >
                  <TabsTrigger value={value}>{name}</TabsTrigger>
                </motion.div>
              ))}
            </TabsList>

            <TabsContent value="poslední" className="w-full">
              <ScrollArea className="flex items-center justify-center w-full">
                <div className="flex w-full gap-4 py-10 justify-evenly md:gap-10">
                  {lastCreated.map((last, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: i * 0.1,
                      }}
                      viewport={{ once: true, amount: 0.5 }}
                      key={i}
                    >
                      <Link href={`/recipePage/${last._id}`}>
                        <Card className="p-0 overflow-hidden w-[300px] min-h-[330px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg">
                          <CardHeader className="p-0 mb-5">
                            <Image
                              src={last.image}
                              alt={last.title}
                              className="object-cover h-[200px] w-[300px]"
                              width={200}
                              height={200}
                            />
                          </CardHeader>
                          <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                            <h3 className="text-lg font-semibold">
                              {last.title}
                            </h3>
                          </CardContent>
                          <CardFooter className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                            <div className="flex items-center justify-center gap-3 ">
                              <Avatar className="flex justify-center items-center h-[30px] w-[30px] ">
                                <AvatarImage
                                  alt="avatar"
                                  className="object-cover rounded-full "
                                  // @ts-ignore
                                  src={last.author.profilePicture}
                                />
                                <AvatarFallback className="flex items-center justify-center text-sm font-semibold text-center text-white rounded-full size-full bg-primary">
                                  {/* @ts-ignore */}
                                  {last.author.name
                                    ?.split(" ")
                                    .map((word: any) => word[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {/* @ts-ignore */}
                              <span>{last.author.name}</span>
                            </div>
                            <span className="font-bold text-primary">
                              {last.time} minut
                            </span>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>

            <TabsContent value="maso">
              <ScrollArea className="w-full">
                <div className="flex w-full gap-4 py-10 justify-evenly md:gap-10">
                  {meat.map((meat, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: i * 0.1,
                      }}
                      key={i}
                    >
                      <Link href={`/recipePage/${meat._id}`}>
                        <Card className="p-0 overflow-hidden w-[300px] min-h-[330px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg">
                          <CardHeader className="p-0 mb-5">
                            <Image
                              src={meat.image}
                              alt={meat.title}
                              className="object-cover h-[200px] w-[300px]"
                              width={200}
                              height={200}
                            />
                          </CardHeader>
                          <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                            <h3 className="text-lg font-semibold">
                              {meat.title}
                            </h3>
                          </CardContent>
                          <CardFooter className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                            <div className="flex items-center gap-3">
                              <Avatar className=" flex justify-center items-center h-[30px] w-[30px]  ">
                                <AvatarImage
                                  alt="avatar"
                                  className="object-cover rounded-full "
                                  // @ts-ignore
                                  src={meat.author.profilePicture}
                                />
                                <AvatarFallback className="flex items-center justify-center text-sm font-semibold text-center text-white rounded-full size-full bg-primary">
                                  {/* @ts-ignore */}
                                  {meat.author.name
                                    ?.split(" ")
                                    .map((word: any) => word[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {/* @ts-ignore */}
                              <span>{meat.author.name}</span>
                            </div>
                            <span className="font-bold text-primary">
                              {meat.time} minut
                            </span>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="vegan">
              <ScrollArea className="w-full">
                <div className="flex w-full gap-4 py-10 justify-evenly md:gap-10">
                  {vegan.map((veg, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: i * 0.1,
                      }}
                      key={i}
                    >
                      {/* @ts-ignore */}
                      <Link href={`/recipePage/${vegan._id}`}>
                        <Card className="p-0 overflow-hidden w-[300px] min-h-[330px] hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg">
                          <CardHeader className="p-0 mb-5">
                            <Image
                              src={veg.image}
                              alt={veg.title}
                              className="object-cover h-[200px] w-[300px]"
                              width={200}
                              height={200}
                            />
                          </CardHeader>
                          <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                            <h3 className="text-lg font-semibold">
                              {veg.title}
                            </h3>
                          </CardContent>
                          <CardFooter className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                            <div className="flex items-center gap-3">
                              <Avatar className=" flex justify-center items-center h-[30px] w-[30px]  ">
                                <AvatarImage
                                  alt="avatar"
                                  className="object-cover rounded-full "
                                  // @ts-ignore
                                  src={veg.author.profilePicture}
                                />
                                <AvatarFallback className="flex items-center justify-center text-sm font-semibold text-center text-white rounded-full size-full bg-primary">
                                  {/* @ts-ignore */}
                                  {veg.author.name
                                    ?.split(" ")
                                    .map((word: any) => word[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {/* @ts-ignore */}
                              <span>{veg.author.name}</span>
                            </div>
                            <span className="font-bold text-primary">
                              {veg.time} minut
                            </span>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="ryby">
              <ScrollArea className="w-full">
                <div className="flex w-full gap-4 py-10 justify-evenly md:gap-10">
                  {fish.map((fish, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: i * 0.1,
                      }}
                      key={i}
                    >
                      <Link href={`/recipePage/${fish._id}`}>
                        <Card className="p-0 overflow-hidden w-[300px] min-h-[330px] hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg">
                          <CardHeader className="p-0 mb-5">
                            <Image
                              src={fish.image}
                              alt={fish.title}
                              className="object-cover h-[200px] w-[300px]"
                              width={200}
                              height={200}
                            />
                          </CardHeader>
                          <CardContent className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                            <h3 className="text-lg font-semibold">
                              {fish.title}
                            </h3>
                          </CardContent>
                          <CardFooter className="flex flex-col items-center justify-between gap-2 text-center md:text-start md:gap-0 md:flex-row">
                            <div className="flex items-center gap-3">
                              <Avatar className=" flex justify-center items-center h-[30px] w-[30px]  ">
                                <AvatarImage
                                  alt="avatar"
                                  className="object-cover rounded-full"
                                  // @ts-ignore
                                  src={fish.author.profilePicture}
                                />
                                <AvatarFallback className="flex items-center justify-center text-sm font-semibold text-center text-white rounded-full size-full bg-primary">
                                  {/* @ts-ignore */}
                                  {fish.author.name
                                    ?.split(" ")
                                    .map((word: any) => word[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {/* @ts-ignore */}
                              <span>{fish.author.name}</span>
                            </div>
                            <span className="font-bold text-primary">
                              {fish.time} minut
                            </span>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
};

export default Choose;
