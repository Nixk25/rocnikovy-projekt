"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

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
import { Button } from "./ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
type editRecipeProps = {
  id: any;
  title: string;
  desc: string;
  ingredients: string;
  time: number;
  procedure: string;
  image: string;
};

const EditRecipe = ({
  id,
  title,
  desc,
  ingredients,
  time,
  procedure,
  image,
}: editRecipeProps) => {
  const [newImage, setNewImage] = useState<string>(image);

  const router = useRouter();
  const [previewRecipe, setPreviewRecipe] = useState<string>(image);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle: values.title,
          newDesc: values.desc,
          newIngredients: values.ingredients,
          newTime: values.time,
          newProcedure: values.procedure,
          newImage: newImage,
        }),
      });

      if (res.ok) {
        form.reset();
        router.refresh();
        router.replace("/user");
        toast.success("Úprava receptu byla úspěšná");
      }
    } catch (err) {
      console.error(err);
      toast.error("Nepodařilo se upravit recept");
    }
  };

  const formSchema = z.object({
    title: z
      .string()
      .min(2, { message: "Název musí mít alespoň 2 písmena" })
      .max(50, { message: "Název nesmí být delší než 50 písmen" }),
    desc: z.string(),
    ingredients: z.any(),
    time: z.coerce
      .number()
      .int({ message: "Číslo nesmí být desetinné" })
      .positive({ message: "Číslo nesmí být zaporné" }),
    procedure: z.any(),
    image: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      desc: desc,
      ingredients: ingredients,
      time: time,
      procedure: procedure,
      image: image,
    },
  });
  return (
    <section className="flex flex-col items-center justify-center w-screen pt-10 my-20 ">
      <main className="relative flex flex-col gap-3 px-10 py-8 text-center rounded-lg w-max">
        <h2 className="font-bold sm-clamp">Upravte svůj recept</h2>
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
                    <>
                      <div className="flex flex-col items-center justify-center mt-5 rounded-lg">
                        <h3 className="mb-3 text-lg">Nový obrázek receptu</h3>
                        <Avatar className="h-[150px] w-[150px]">
                          <AvatarImage
                            className="object-cover rounded-lg "
                            src={previewRecipe}
                          />
                        </Avatar>
                      </div>
                    </>

                    <FormControl>
                      <CldUploadWidget
                        uploadPreset="pmhofx0x"
                        //@ts-ignore
                        onSuccess={(result, { widget }) => {
                          //@ts-ignore
                          setNewImage(result?.info?.url);
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
                              className="mt-5 transition-all duration-300 outline-primary outline hover:scale-105 active:scale-95"
                              onClick={handleOnClick}
                            >
                              Vyberte nový obrázek receptu
                            </Button>
                          );
                        }}
                      </CldUploadWidget>
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="p-3 mt-3 text-white transition-all duration-300 border-none rounded-lg outline-none cursor-pointer bg-primary hover:scale-105 hover:brightness-105 active:scale-95 active:brightness-95"
            >
              Upravit recept
            </Button>
          </form>
        </Form>
      </main>
    </section>
  );
};

export default EditRecipe;
