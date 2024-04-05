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
import { useRouter } from "next/navigation";

const getRecipes = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/recipes`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("failed to fetch");
    }

    return res.json();
  } catch (err) {
    console.error("Error loading recipes", err);
  }
};

const Hero = () => {
  const router = useRouter();
  //@ts-ignore
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    getRecipes().then((data) => setRecipes(data.recipes));

    const pressed = (e: KeyboardEvent) => {
      if (e.key === "h" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", pressed);
    return () => document.removeEventListener("keydown", pressed);
  }, []);

  return (
    <section className="w-full hero h-dvh">
      <div className="flex items-center justify-center w-full h-full bg-center bg-no-repeat bg-cover bg-hero">
        <div className="flex items-center justify-center w-full h-full bg-white/80">
          <div className="container flex flex-col items-center justify-center">
            <h1 className="text-primary text-center clamp leading-[55px] mb-5 mt-[100px] font-extrabold">
              Vyhledejte svůj recept
            </h1>
            <p className="mb-5 text-lg text-center ">
              Vítejte ve světě, kde se vaření mění ve vášeň a každý pokrm je
              <span className="font-bold text-primary"> dobrodružstvím</span>.
              Objevte recepty od vášnivých kuchařů jako jste
              <span className="font-bold text-primary"> Vy</span>. Společně
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
                Vyhledejte recept
              </Button>
              <Search
                color="#bfc3cc"
                className="absolute top-1/2 left-0 -translate-y-1/2   w-[3rem]"
              />
              <div className="absolute right-0 items-center justify-center hidden px-3 text-white -translate-y-1/2 cursor-pointer sm:flex top-1/2 ">
                <Command size={16} color="#bfc3cc" />
                <span className="text-[#bfc3cc] ">H</span>
              </div>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Vyhledejte recept..." />
              <CommandList className="max-h-[200px]">
                <CommandEmpty>
                  <h3>Nic nebylo nalezeno</h3>
                  <Button className="mt-5 text-white">Vytvořte recept</Button>
                </CommandEmpty>

                <CommandGroup heading="Máte na mysli">
                  {recipes.map((rec: any, i: number) => (
                    <CommandItem
                      key={i}
                      //@ts-ignore
                      value={rec.title}
                      onSelect={() => {
                        router.push(`/recipePage/${rec._id}`);

                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{rec.title}</span>
                        <span>{rec.time} minut</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
