"use client";
import cocacola from "../public/cocacola.png";
import nestle from "../public/nestle.png";
import tyson from "../public/tyson.png";
import mondelez from "../public/mondelez.png";
import pepsi from "../public/pepsi.png";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
const InfiniteLoop = () => {
  return (
    <section className="  rounded-md flex flex-col  bg-white items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={logos}
        direction="right"
        speed="normal"
        pauseOnHover={false}
      />
    </section>
  );
};

const logos = [
  {
    name: "Nestlé",
    image: nestle,
  },
  {
    name: "Pepsi",
    image: pepsi,
  },
  {
    name: "Coca-Cola",
    image: cocacola,
  },
  {
    name: "Tyson Foods",
    image: tyson,
  },
  {
    name: "Mondelez International",
    image: mondelez,
  },
];

export default InfiniteLoop;
