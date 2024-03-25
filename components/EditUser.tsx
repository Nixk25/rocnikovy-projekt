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
import { useSession } from "next-auth/react";

type editUserProps = {
  id: any;
  name: string;
  email: string;
  profilePicture: string;
};

const EditUser = ({ id, name, email, profilePicture }: editUserProps) => {
  const [newProfilePicture, setNewProfilePicture] =
    useState<string>(profilePicture);

  const router = useRouter();
  const [preview, setPreview] = useState<string>(profilePicture);
  const { data: session, update } = useSession();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName: values.name,
          newEmail: values.email,
          newProfilePicture: newProfilePicture,
        }),
      });

      if (res.ok) {
        form.reset();
        router.refresh();
        router.replace("/user");
        await update({
          ...session,
          user: {
            ...session?.user,
            email: values.email,
            name: values.name,
            profilePicture: newProfilePicture,
          },
        });
        toast.success("Uživatelské údaje změněny");
      }
    } catch (err) {
      console.log(err);
      toast.error("Nepodařilo se změnit údaje");
    }
  };

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Jméno musí mít alespoň 2 písmena" })
      .max(50, { message: "Jméno nesmí být delší než 50 písmen" }),
    email: z.string().email({ message: "Neplatný email" }),
    profilePicture: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      email: email,
      profilePicture: "",
    },
  });
  return (
    <section className="flex justify-center items-center flex-col  w-screen my-20 h-dvh  ">
      <main className=" text-center py-8 px-10 flex flex-col relative gap-3 rounded-lg w-max ">
        <h2 className=" font-bold sm-clamp ">Změnit si své údaje</h2>

        <Form {...form}>
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uživatelské jméno</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        autoFocus
                        type="text"
                        placeholder="Zadejte své jméno..."
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        type="email"
                        placeholder="Zadejte svůj email..."
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
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <div>
                    {preview === "" ? (
                      <p>Ještě nemáte žádný profilový obrázek</p>
                    ) : (
                      <>
                        <div className="flex flex-col items-center justify-center mt-5 rounded-lg">
                          <h3 className="mb-3 text-lg">Nový obrázek receptu</h3>
                          <Avatar className="h-[150px] w-[150px]">
                            <AvatarImage
                              className="object-cover rounded-lg "
                              src={preview}
                            />
                          </Avatar>
                        </div>
                      </>
                    )}

                    <FormControl>
                      <CldUploadWidget
                        uploadPreset="pmhofx0x"
                        //@ts-ignore
                        onSuccess={(result, { widget }) => {
                          //@ts-ignore
                          setNewProfilePicture(result?.info?.url);
                          //@ts-ignore
                          setPreview(result?.info?.url);
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
              className="p-3 bg-primary text-white border-none outline-none rounded-lg mt-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-105 active:scale-95 active:brightness-95"
            >
              Změnit údaje
            </Button>
          </form>
        </Form>
      </main>
    </section>
  );
};

export default EditUser;
