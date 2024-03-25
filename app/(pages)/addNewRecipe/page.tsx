"use client";

import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import avatar from "../../../public/avatar.png";
import { toast } from "sonner";
import { FaCheck, FaChevronDown } from "react-icons/fa";

const addNewRecipe = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [recipeImg, setRecipeImg] = useState<string>("");
  const [previewRecipe, setPreviewRecipe] = useState<string>("");

  const allCategories = [
    { id: 1, name: "Maso" },
    { id: 2, name: "Ryby" },
    { id: 3, name: "Vegan" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (selected: any) => {
    const newCategory = selected[selected.length - 1];
    const alreadySelected = selectedCategories.find(
      (category) => category.id === newCategory.id
    );

    if (alreadySelected) {
      setSelectedCategories(
        selectedCategories.filter((category) => category.id !== newCategory.id)
      );
      toast.error("Tato kategorie byla odstraněna.");
    } else if (selected.length <= selectedCategories.length) {
      setSelectedCategories(
        selectedCategories.filter((category) => selected.includes(category))
      );
    } else {
      setSelectedCategories(selected);
      toast.success("Kategorie byla přidána.");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ingredientsArray = values.ingredients
      .split(",")
      .map((item) => item.trim());

    const categoriesArray = selectedCategories.map(
      (category: any) => category.name
    );

    const procedureArray = values.procedure
      .split(",")
      .map((step) => step.trim());

    try {
      const res = await fetch(`/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          desc: values.desc,
          categories: categoriesArray,
          ingredients: ingredientsArray,
          author: session?.user?.name,
          //@ts-ignore
          authorId: session?.user?.id,
          authorProfilePicture:
            //@ts-ignore
            session?.user?.image || session?.user?.profilePicture,
          time: values.time,
          procedure: procedureArray,
          image: recipeImg,
        }),
      });

      if (res.ok) {
        form.reset();
        router.push("/catalog");
        toast.success("Recept byl přidán");
      }
    } catch (err) {
      console.log(err);
      toast.error("Nepodařilo se přidat recept");
    }
  };

  const formSchema = z.object({
    title: z
      .string()
      .min(2, { message: "Název musí mít alespoň 2 písmena" })
      .max(50, { message: "Název nesmí být delší než 50 písmen" }),
    desc: z.string(),
    categories: z.string({
      required_error: "Prosím vyberte kategorii",
    }),
    ingredients: z.string(),
    time: z.coerce
      .number()
      .int({ message: "Číslo nesmí být desetinné" })
      .positive({ message: "Číslo nesmí být zaporné" }),
    procedure: z.string(),
    image: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      categories: "",
      ingredients: "",
      time: 0,
      procedure: "",
      image: "",
    },
  });
  return (
    <section className="flex flex-col items-center justify-center w-screen my-20 ">
      <main className="relative flex flex-col gap-3 px-10 py-8 text-center rounded-lg  w-max">
        <h2 className="font-bold  sm-clamp">Přidejte recept</h2>
        <p>
          Všechny pole jsou{" "}
          <span className="font-bold text-primary">povinná!</span>
        </p>
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Název receptu</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        autoFocus
                        type="text"
                        placeholder="Zadejte název receptu..."
                        className="w-full px-5 py-2 transition-all duration-300 rounded-lg shadow-lg outline-2 outline-transparent focus-within:outline-primary focus-within:outline-2 input"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Popis receptu</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Textarea
                        placeholder="Popište recept..."
                        className="w-full px-5 py-2 transition-all duration-300 rounded-lg shadow-lg outline-2 outline-transparent focus-within:outline-primary focus-within:outline-2 input"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Kategorie</FormLabel>

                  <Listbox
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    multiple
                  >
                    <div className="relative mt-1 z-10">
                      <Listbox.Button className="w-full">
                        {({ open }) => (
                          <div className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selectedCategories.length > 0 ? (
                                selectedCategories
                                  .map((category) => category.name)
                                  .join(", ")
                              ) : (
                                <span className="text-slate-500">
                                  Vyberte Kategorii
                                </span>
                              )}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <FaChevronDown
                                className={`h-5 w-5 text-gray-400 transform ${
                                  open ? "rotate-180" : ""
                                }`}
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        )}
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {allCategories.map((category) => (
                            <Listbox.Option
                              key={category.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-accent text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={category}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium " : "font-normal"
                                    }`}
                                  >
                                    {category.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                                      <FaCheck size={20} color="black" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredience</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Textarea
                        placeholder="Napište všechny ingredience"
                        className="w-full px-5 py-2 transition-all duration-300 rounded-lg shadow-lg outline-2 outline-transparent focus-within:outline-primary focus-within:outline-2 input"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Čas na přípravu (min)</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        type="number"
                        placeholder="Zadejte čas na přípravu...(min)"
                        className="w-full px-5 py-2 transition-all duration-300 rounded-lg shadow-lg outline-2 outline-transparent focus-within:outline-primary focus-within:outline-2 input"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="procedure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postup</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Textarea
                        placeholder="Zadejte postup..."
                        className="w-full px-5 py-2 transition-all duration-300 rounded-lg shadow-lg outline-2 outline-transparent focus-within:outline-primary focus-within:outline-2 input"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div>
                    {previewRecipe ? (
                      <>
                        <div className="flex flex-col items-center justify-center mt-5 rounded-lg">
                          <h3 className="mb-3 text-lg">Obrázek receptu</h3>
                          <Avatar className="h-[150px] w-[150px]">
                            <AvatarImage
                              className="object-cover rounded-lg "
                              src={previewRecipe}
                            />
                          </Avatar>
                        </div>
                      </>
                    ) : (
                      <FormControl>
                        <CldUploadWidget
                          uploadPreset="pmhofx0x"
                          //@ts-ignore
                          onSuccess={(result, { widget }) => {
                            //@ts-ignore
                            setRecipeImg(result?.info?.url);
                            //@ts-ignore
                            setPreviewRecipe(result?.info?.url);
                            //@ts-ignore
                            widget.close();
                            toast.success("Obrázek receptu nahrán");
                          }}
                        >
                          {({ open }) => {
                            function handleOnClick() {
                              open();
                            }
                            return (
                              <Button
                                type="button"
                                variant="outline"
                                className="mt-5 transition-all duration-300  outline-primary outline hover:scale-105 active:scale-95"
                                onClick={handleOnClick}
                              >
                                Vyberte obrázek receptu
                              </Button>
                            );
                          }}
                        </CldUploadWidget>
                      </FormControl>
                    )}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="p-3 mt-3 text-white transition-all duration-300 border-none rounded-lg outline-none cursor-pointer bg-primary hover:scale-105 hover:brightness-105 active:scale-95 active:brightness-95"
            >
              Přidat recept
            </Button>
          </form>
        </Form>
      </main>
    </section>
  );
};

export default addNewRecipe;
