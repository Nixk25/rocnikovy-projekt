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
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import avatar from "../../../public/avatar.png";

const addNewRecipe = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [recipeImg, setRecipeImg] = useState<string>("");
  const [previewRecipe, setPreviewRecipe] = useState<string>("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          desc: values.desc,
          ingredients: values.ingredients,
          author: session?.user?.name,
          //@ts-ignore
          authorId: session?.user?.id,
          authorProfilePicture:
            //@ts-ignore
            session?.user?.image || session?.user?.profilePicture || avatar,
          time: values.time,
          procedure: values.procedure,
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
      ingredients: "",
      time: 0,
      procedure: "",
      image: "",
    },
  });
  return (
    <section className="flex justify-center items-center flex-col  w-screen my-20   ">
      <main className=" text-center py-8 px-10 flex flex-col relative gap-3 rounded-lg w-max ">
        <h2 className=" font-bold sm-clamp ">Přidejte recept</h2>
        <p>
          Všechny pole jsou{" "}
          <span className="text-primary font-bold">povinná!</span>
        </p>
        <Form {...form}>
          <form
            className="w-full flex flex-col gap-5"
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
                        className="outline-2 outline-transparent shadow-lg  py-2 rounded-lg px-5  w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
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
                        className="outline-2 outline-transparent shadow-lg px-5 py-2 rounded-lg  w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
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
                        className="outline-2 outline-transparent shadow-lg px-5 py-2 rounded-lg  w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
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
                        className="outline-2 outline-transparent shadow-lg px-5 py-2 rounded-lg  w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
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
                        className="outline-2 outline-transparent shadow-lg px-5 py-2 rounded-lg  w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
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
                        <div className="mt-5 rounded-lg flex justify-center items-center flex-col">
                          <h3 className="text-lg mb-3">Obrázek receptu</h3>
                          <Avatar className="h-[150px] w-[150px]">
                            <AvatarImage
                              className="rounded-lg object-cover "
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
                                className=" mt-5 outline-primary outline hover:scale-105 active:scale-95 transition-all duration-300"
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
              className="p-3 bg-primary text-white border-none outline-none rounded-lg mt-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-105 active:scale-95 active:brightness-95"
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
