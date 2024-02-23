"use client";

import { useState, useEffect } from "react";
import { Search, Command } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Button } from "./ui/button";

interface Recipe {
  value: string;
  label: string;
}

interface TestRecipes {
  label: string;
  value: string;
  time: string;
}

const popular: Recipe[] = [
  {
    value: "Kuře na paprice",
    label: "Kuře na paprice",
  },
  {
    value: "Špagety",
    label: "Špagety",
  },
  {
    value: "Kuře na česneku",
    label: "Kuře na česneku",
  },
  {
    value: "Domácí pizza",
    label: "Domácí pizza",
  },
  {
    value: "Domácí hranolky",
    label: "Domácí hranolky",
  },
];

const testRecipes: TestRecipes[] = [
  {
    label: "Spaghetti Bolognese",
    time: "5-10 min",
    value: "spaghetti bolognese",
  },
  { label: "Margherita Pizza", time: "2-3 hodiny", value: "margherita pizza" },
  { label: "Domácí lasagne", time: "30 min", value: "domácí lasagne" },
  { label: "Snídaňové lívance", time: "20 min", value: "snídaňové lívance" },
];

const Hero = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("Vyhledejte recept...");
  const [isHidden, setIsHidden] = useState<boolean>(false);
  useEffect(() => {
    const pressed = (e: KeyboardEvent) => {
      if (e.key === "h" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", pressed);
    return () => document.removeEventListener("keydown", pressed);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  return (
    <section className="hero h-dvh w-full">
      <div className="bg-hero bg-no-repeat bg-cover bg-center w-full h-full flex justify-center items-center">
        <div className="w-full h-full bg-white/70 flex justify-center items-center">
          <div className="container flex flex-col justify-center items-center">
            <h1 className="text-primary text-center clamp leading-[55px] mb-5 mt-[100px] font-extrabold">
              Vyhledejte svůj recept
            </h1>
            <p className="mb-5 text-lg text-center ">
              Vítejte ve světě, kde se vaření mění ve vášeň a každý pokrm je
              <span className="text-primary font-bold"> dobrodružstvím</span>.
              Objevte recepty od vášnivých kuchařů jako jste
              <span className="text-primary font-bold"> Vy</span>. Společně
              rozvíjejte chuťové hranice!
            </p>
            <div className="relative max-w-[350px] flex  ">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full px-20 text-text"
                onClick={() => setOpen((open) => !open)}
              >
                {value}
              </Button>
              <Search
                color="#bfc3cc"
                className="absolute top-1/2 left-0 -translate-y-1/2   w-[3rem]"
              />
              <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2  justify-center items-center   text-white px-3 cursor-pointer  ">
                <Command size={16} color="#bfc3cc" />
                <span className="text-[#bfc3cc] ">H</span>
              </div>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput
                placeholder="Vyhledejte recept..."
                onChangeCapture={handleInput}
              />
              <CommandList>
                <CommandEmpty>
                  <h3>Nic nebylo nalezeno</h3>
                  <Button className="mt-5 text-white">Vytvořte recept</Button>
                </CommandEmpty>
                {isHidden ? (
                  <CommandGroup heading="Máte na mysli">
                    {testRecipes.map((test) => (
                      <CommandItem
                        key={test.value}
                        value={test.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <div className="flex w-full justify-between items-center">
                          <span>{test.label}</span>
                          <span>{test.time}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandGroup heading="Populární">
                    {popular.map((pop) => (
                      <CommandItem
                        key={pop.value}
                        value={pop.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {pop.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </CommandDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
