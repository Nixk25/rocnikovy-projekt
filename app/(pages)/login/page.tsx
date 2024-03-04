"use client";

import React, { FormEvent, useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
import GoogleLoginBtn from "@/components/GoogleLoginBtn";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        return;
      } else {
        form.reset();
        router.replace("/user");
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  const formSchema = z.object({
    email: z.string().email({ message: "Neplatný email" }),
    password: z.string().min(8, { message: "Heslo musí mít alespoň 8 písmen" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <section className="flex justify-center items-center flex-col  h-dvh w-screen ">
      <main className=" text-center py-8 px-10 flex flex-col relative gap-3 rounded-lg ">
        <h2 className="mb-5  font-bold sm-clamp ">Vítejte zpět! 👋</h2>
        <Form {...form}>
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        autoFocus
                        type="email"
                        placeholder="Zadejte svůj email..."
                        className="outline-2 outline-transparent shadow-lg  py-2 rounded-lg px-5 pl-10 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
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
                        placeholder="Zadejte své heslo"
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

            <button
              type="submit"
              className="p-3 bg-primary text-white border-none outline-none rounded-lg mt-3 cursor-pointer transition-all hover:scale-105 hover:brightness-105 active:scale-95 active:brightness-95"
            >
              Přihlásit se
            </button>
          </form>
        </Form>
        <div className="w-full h-[2px] #bfc3cc] relative mt-5">
          <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-3">
            NEBO
          </span>
        </div>
        <div className="flex  justify-center items-center my-5">
          <GoogleLoginBtn />
        </div>
        <Link href="/register">
          <p className="flex flex-col gap-3">
            Ještě nepatříte mezi nás?
            <span className="cursor-pointer text-primary">
              Zaregistrujte se!
            </span>
          </p>
        </Link>
      </main>
    </section>
  );
};

export default Login;
