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
import { motion } from "framer-motion";
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
    <section className="flex flex-col items-center justify-center w-screen my-20 ">
      <motion.main
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex flex-col gap-3 px-10 py-8 text-center rounded-lg  w-max"
      >
        <h2 className="font-bold  sm-clamp">Zaregistruj se</h2>
        <p className="mb-5 text-sm">
          A připoj se k největší komunitě{" "}
          <span className="font-bold text-primary">domácích kuchařů</span>!
        </p>
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-5"
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
                        className="w-full px-5 py-2 pl-10 transition-all duration-300 rounded-lg shadow-lg outline-2 outline-transparent focus-within:outline-primary focus-within:outline-2 input"
                        {...field}
                      />
                      <FaUser className="absolute -translate-y-1/2 top-1/2 left-2" />
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
                        className="w-full px-5 py-2 pl-10 transition-all duration-300 rounded-lg shadow-lg outline-2 outline-transparent focus-within:outline-primary focus-within:outline-2 input"
                        {...field}
                      />
                      <IoMdMail className="absolute -translate-y-1/2 top-1/2 left-2" />
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
                        className="w-full px-5 py-2 pl-10 transition-all duration-300 rounded-lg shadow-lg outline-2 focus-within:outline-primary focus-within:outline-2 input"
                        {...field}
                      />
                      <FaLock className="absolute -translate-y-1/2 top-1/2 left-2" />
                      {showPassword ? (
                        <FaEyeSlash
                          onClick={() => setShowPassword(false)}
                          className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-2"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setShowPassword(true)}
                          className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-2"
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
                        <div className="flex flex-col items-center justify-center mt-5 rounded-lg">
                          <h3 className="mb-3 text-lg">
                            Váš profilový obrázek
                          </h3>
                          <Avatar className="h-[150px] w-[150px]">
                            <MemoizedAvatarImage
                              className="object-cover rounded-lg "
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
                                className="mt-5 transition-all duration-300  outline-primary outline hover:scale-105 active:scale-95"
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
              className="p-3 mt-3 text-white transition-all duration-300 border-none rounded-lg outline-none cursor-pointer bg-primary hover:scale-105 hover:brightness-105 active:scale-95 active:brightness-95"
            >
              Zaregistrovat se
            </Button>
            <span>Už mezi nás patříte?</span>
            <Link
              className="font-bold  text-primary hover:brightness-105"
              href="/login"
            >
              Přihlašte se
            </Link>
          </form>
        </Form>
      </motion.main>
    </section>
  );
};

export default Register;
