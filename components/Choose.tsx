import React from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronRight, Eye, Star } from "lucide-react";
import firstImage from "../public/first-img.png";
import secondImage from "../public/second-img.png";
import thirdImage from "../public/third-img.png";
import fourthImage from "../public/fourth-img.png";
import fifthImage from "../public/fifth-img.png";
import sixthImage from "../public/sixth-img.png";
import smoothieBowlImage from "../public/fruitSmothie.jpg";
import quinoaSaladImage from "../public/quionaSalad.jpg";
import turkeySteakImage from "../public/turkeySteak.jpg";
import grilledMeatImage from "../public/grilledMeat.jpg";
import veganBowl from "../public/veganBowl.jpg";
import pumpinSoup from "../public/pumpkinSoup.jpg";
import salmonImage from "../public/salmonGrilled.jpg";
import tunaTartareImage from "../public/rawSalmon.jpg";
import grilledFishImage from "../public/grilledFish.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const recommended: recipe[] = [
  {
    name: "Kuřecí Salát",
    img: fifthImage,
    time: "15 min",
    stars: 4.9,
  },
  {
    name: "Smoothie Bowl",
    img: smoothieBowlImage,
    time: "10 min",
    stars: 4.5,
  },
  {
    name: "Quinoa Salát",
    img: quinoaSaladImage,
    time: "20 min",
    stars: 4.7,
  },
];

const meat: recipe[] = [
  {
    name: "Krůtí Steak",
    img: turkeySteakImage,
    time: "30 min",
    stars: 4.8,
  },
  {
    name: "Grilované Maso s Bylinkovým Máslem",
    img: grilledMeatImage,
    time: "45 min",
    stars: 4.6,
  },
  {
    name: "Hovězí Burger",
    img: sixthImage,
    time: "25 min",
    stars: 4.7,
  },
];

const vegan: recipe[] = [
  {
    name: "Vegan bowl",
    img: veganBowl,
    time: "30 min",
    stars: 4.5,
  },
  {
    name: "Brokolicová Polévka",
    img: pumpinSoup,
    time: "20 min",
    stars: 4.2,
  },
  {
    name: "Ovocný Smoothie",
    img: smoothieBowlImage,
    time: "15 min",
    stars: 4.6,
  },
];

const fish: recipe[] = [
  {
    name: "Losos s Medovým Glazúrem",
    img: salmonImage,
    time: "35 min",
    stars: 4.9,
  },
  {
    name: "Tunaková Tatarák",
    img: tunaTartareImage,
    time: "25 min",
    stars: 4.7,
  },
  {
    name: "Ryba na Grilu",
    img: grilledFishImage,
    time: "30 min",
    stars: 4.6,
  },
];

const Choose = () => {
  return (
    <section className="mt-12 w-full mb-20">
      <div className="container">
        <header className="flex justify-between items-center w-full mb-5">
          <h2 className=" uppercase text-3xl font-bold  sm-clamp">
            Vyberte si!
          </h2>
          <p className="flex justify-center items-center cursor-pointer hover:text-primary transition-all">
            Zobrazit více
            <ChevronRight />
          </p>
        </header>
        <Tabs defaultValue="populární">
          <TabsList className="flex flex-wrap bg-transparent mb-10">
            <TabsTrigger value="populární">Populární</TabsTrigger>
            <TabsTrigger value="doporučujeme">Doporučujeme</TabsTrigger>
            <TabsTrigger value="maso">Maso</TabsTrigger>
            <TabsTrigger value="vegan">Vegan</TabsTrigger>
            <TabsTrigger value="ryby">Ryby</TabsTrigger>
          </TabsList>
          <TabsContent value="populární">
            <ScrollArea className="w-full flex justify-center items-center">
              <div className="flex justify-evenly w-full gap-4 md:gap-10 py-10">
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
                      <div className="flex gap-1">
                        <span>{pop.stars}</span>
                        <Star color="#f4d301" fill="#f4d301" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <span className="text-primary font-bold">{pop.time}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="doporučujeme">
            <ScrollArea className="w-full">
              <div className="flex justify-evenly w-full gap-4 md:gap-10 py-10">
                {recommended.map((rec, i) => (
                  <Card
                    key={i}
                    className="p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
                  >
                    <CardHeader className="p-0 mb-5">
                      <Image
                        src={rec.img}
                        alt={rec.name}
                        className="object-cover max-h-[200px] w-[300px]"
                        placeholder="blur"
                      />
                    </CardHeader>
                    <CardContent className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <h3 className="text-lg font-semibold">{rec.name}</h3>
                      <div className="flex gap-1">
                        <span>{rec.stars}</span>
                        <Star color="#f4d301" fill="#f4d301" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <span className="text-primary font-bold">{rec.time}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="maso">
            <ScrollArea className="w-full">
              <div className="flex justify-evenly w-full gap-4 md:gap-10 py-10">
                {meat.map((meat, i) => (
                  <Card
                    key={i}
                    className="p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
                  >
                    <CardHeader className="p-0 mb-5">
                      <Image
                        src={meat.img}
                        alt={meat.name}
                        className="object-cover max-h-[200px] w-[300px]"
                        placeholder="blur"
                      />
                    </CardHeader>
                    <CardContent className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <h3 className="text-lg font-semibold">{meat.name}</h3>
                      <div className="flex gap-1">
                        <span>{meat.stars}</span>
                        <Star color="#f4d301" fill="#f4d301" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <span className="text-primary font-bold">
                        {meat.time}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="vegan">
            <ScrollArea className="w-full">
              <div className="flex justify-evenly w-full gap-4 md:gap-10 py-10">
                {vegan.map((veg, i) => (
                  <Card
                    key={i}
                    className="p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
                  >
                    <CardHeader className="p-0 mb-5">
                      <Image
                        src={veg.img}
                        alt={veg.name}
                        className="object-cover max-h-[200px] w-[300px]"
                        placeholder="blur"
                      />
                    </CardHeader>
                    <CardContent className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <h3 className="text-lg font-semibold">{veg.name}</h3>
                      <div className="flex gap-1">
                        <span>{veg.stars}</span>
                        <Star color="#f4d301" fill="#f4d301" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <span className="text-primary font-bold">{veg.time}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="ryby">
            <ScrollArea className="w-full">
              <div className="flex justify-evenly w-full gap-4 md:gap-10 py-10">
                {fish.map((fish, i) => (
                  <Card
                    key={i}
                    className="p-0 overflow-hidden w-[300px]  hover:scale-105 transition-all cursor-pointer border-none outline-none shadow-lg"
                  >
                    <CardHeader className="p-0 mb-5">
                      <Image
                        src={fish.img}
                        alt={fish.name}
                        className="object-cover max-h-[200px] w-[300px]"
                        placeholder="blur"
                      />
                    </CardHeader>
                    <CardContent className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <h3 className="text-lg font-semibold">{fish.name}</h3>
                      <div className="flex gap-1">
                        <span>{fish.stars}</span>
                        <Star color="#f4d301" fill="#f4d301" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center flex-col text-center md:text-start gap-2 md:gap-0 md:flex-row">
                      <span className="text-primary font-bold">
                        {fish.time}
                      </span>
                    </CardFooter>
                  </Card>
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
