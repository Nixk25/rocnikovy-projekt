"use client";

import React, { useState } from "react";
import { FaLock, FaEye, FaUser, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
//@ts-ignore
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Register = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        toast.error("Uživatel už existuje", {
          action: {
            label: "Přejít na přihlášení",
            onClick() {
              router.push("/login");
            },
          },
        });

        return;
      }

      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          profilePicture: profilePicture,
        }),
      });

      if (res.ok) {
        form.reset();
        router.push("/login");
        toast.success("Uživatel zaregistrován");
      }
    } catch (err) {
      console.error(err);
      toast.error("Nepodařilo se zaregistrovat");
    }
  };

  const MemoizedAvatarImage = React.memo(AvatarImage);

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Jméno musí mít alespoň 2 písmena" })
      .max(50, { message: "Jméno nesmí být delší než 50 písmen" }),
    email: z.string().email({ message: "Neplatný email" }),
    password: z
      .string()
      .min(8, { message: "Heslo musí mít alespoň 8 písmen" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Heslo musí obsahovat alespoň jedno velké písmeno",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Heslo musí obsahovat alespoň jedno číslo",
      })
      .refine((value) => /\W|_/.test(value), {
        message: "Heslo musí obsahovat alespoň jeden speciální znak",
      }),
    profilePicture: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profilePicture: "",
    },
  });

  return (
    <section className="flex justify-center items-center flex-col  w-screen my-20  ">
      <main className=" text-center py-8 px-10 flex flex-col relative gap-3 rounded-lg w-max ">
        <h2 className=" font-bold sm-clamp ">Zaregistruj se</h2>
        <p className="text-sm mb-5">
          A připoj se k největší komunitě{" "}
          <span className="font-bold text-primary">domácích kuchařů</span>!
        </p>
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
                        className="outline-2 outline-transparent shadow-lg  py-2 rounded-lg px-5 pl-10 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
                        {...field}
                      />
                      <FaUser className="absolute top-1/2 -translate-y-1/2 left-2" />
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
                        className="outline-2 outline-transparent shadow-lg px-5 py-2 rounded-lg pl-10 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
                        {...field}
                      />
                      <IoMdMail className="absolute top-1/2 -translate-y-1/2 left-2" />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heslo</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Zadejte své heslo..."
                        className="outline-2 shadow-lg px-5 py-2 rounded-lg pl-10 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
                        {...field}
                      />
                      <FaLock className="absolute top-1/2 -translate-y-1/2 left-2" />
                      {showPassword ? (
                        <FaEyeSlash
                          onClick={() => setShowPassword(false)}
                          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setShowPassword(true)}
                          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                        />
                      )}
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
                    {preview ? (
                      <>
                        <div className="mt-5 rounded-lg flex justify-center items-center flex-col">
                          <h3 className="text-lg mb-3">
                            Váš profilový obrázek
                          </h3>
                          <Avatar className="h-[150px] w-[150px]">
                            <MemoizedAvatarImage
                              className="rounded-lg object-cover "
                              src={preview}
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
                            setProfilePicture(result?.info?.url);
                            //@ts-ignore
                            setPreview(result?.info?.url);
                            //@ts-ignore
                            widget.close();
                            toast.success("Profilový obrázek byl nahrán");
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
                                Nahrát profilový obrázek
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
              Zaregistrovat se
            </Button>
            <span>Už mezi nás patříte?</span>
            <Link
              className=" text-primary font-bold hover:brightness-105"
              href="/login"
            >
              Přihlašte se
            </Link>
          </form>
        </Form>
      </main>
    </section>
  );
};

export default Register;
