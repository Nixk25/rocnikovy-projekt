import React from "react";
import Image from "next/image";
import people from "../public/people.png";
import dot from "../public/dot.png";

const Join = () => {
  return (
    <section className="mb-20">
      <div className="container">
        <div className="w-full flex justify-center items-center lg:flex-row  flex-col border-2 border-primary rounded-lg mx-auto  bg-people lg:bg-none bg-no-repeat bg-center bg-cover">
          <div className="backdrop-blur-sm bg-black/40 lg:bg-transparent lg:text-text w-full lg:w-1/2 ">
            <div className="w-full text-center lg:text-start  lg:pl-10 p-8 lg:p-5 ">
              <h2 className="sm-clamp text-primary mb-5 tracking-tighter font-bold ">
                Přidejte se do týmu
              </h2>
              <p className="text-lg mb-5 text-white lg:text-text">
                Přidejte svůj oblíbený recept na své jídlo a připojte se do
                skupiny nadšených domácích kuchařů.
              </p>
              <p className="mb-6 text-primary text-xl">Proč se přidat k nám?</p>
              <ul className="list-none flex gap-6 flex-col  justify-center items-center lg:items-start lg:justify-start">
                <li className="flex  items-center gap-3">
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
                <li className="flex  items-center gap-3">
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
                <li className="flex  items-center gap-3">
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
                <li className="flex  items-center gap-3">
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
              <div className="mt-10 flex justify-center items-center lg:justify-start">
                <a href="login.html">
                  <button className="bg-primary shadow-lg p-5 rounded-lg text-lg text-white border-none outline-none cursor-pointer transition-all hover:scale-105 hover:bg-transparent hover:text-primary hover:shadow-none">
                    Přidat se
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full hidden lg:flex">
            <Image
              src={people}
              className="object-cover h-full w-full"
              alt="lidi kteří vaří"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
