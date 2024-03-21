"use client";

import React from "react";
import Image from "next/image";
import people from "../public/people.png";
import dot from "../public/dot.png";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Join = () => {
  const { status } = useSession();
  {
    status === "unauthenticated" && (
      <section className="mb-20">
        <div className="container">
          <div className="flex flex-col items-center justify-center w-full mx-auto bg-center bg-no-repeat bg-cover border-2 rounded-lg lg:flex-row border-primary bg-people lg:bg-none">
            <div className="w-full backdrop-blur-sm bg-black/60 lg:bg-transparent lg:text-text lg:w-1/2 ">
              <div className="w-full p-8 text-center lg:text-start lg:pl-10 lg:p-5 ">
                <h2 className="mb-5 font-bold tracking-tighter sm-clamp text-primary ">
                  Přidejte se do týmu
                </h2>
                <p className="mb-5 text-lg text-white lg:text-text">
                  Přidejte svůj oblíbený recept na své jídlo a připojte se do
                  skupiny nadšených domácích kuchařů.
                </p>
                <p className="mb-6 text-xl text-primary">
                  Proč se přidat k nám?
                </p>
                <ul className="flex flex-col items-center justify-center gap-6 list-none lg:items-start lg:justify-start">
                  <li className="flex items-center gap-3">
                    <Image
                      src={dot}
                      width={40}
                      height={40}
                      className="object-cover "
                      alt="dot"
                    />
                    <span className="text-white lg:text-text">
                      Neustálý přehled o novinkách
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Image
                      src={dot}
                      width={40}
                      height={40}
                      className="object-cover "
                      alt="dot"
                    />
                    <span className="text-white lg:text-text">
                      Možnost přidat si oblíbený recept do oblíbených
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Image
                      src={dot}
                      width={40}
                      height={40}
                      className="object-cover "
                      alt="dot"
                    />
                    <span className="text-white lg:text-text">
                      Možnost přidat své vlastní recepty
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Image
                      src={dot}
                      width={40}
                      height={40}
                      className="object-cover "
                      alt="dot"
                    />
                    <span className="text-white lg:text-text">
                      Možnost hodnotit recepty ostatních
                    </span>
                  </li>
                </ul>
                <div className="flex items-center justify-center mt-10 lg:justify-start">
                  <Link href="/login">
                    <button className="p-5 text-lg text-white transition-all border-none rounded-lg shadow-lg outline-none cursor-pointer bg-primary hover:scale-105 hover:bg-transparent hover:text-primary hover:shadow-none">
                      Přidat se
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden w-1/2 h-full lg:flex">
              <Image
                src={people}
                className="object-cover w-full h-full"
                alt="lidi kteří vaří"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Join;
