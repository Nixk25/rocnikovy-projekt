"use client";

import React, { useState } from "react";
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
import { motion } from "framer-motion";
import { toast } from "sonner";
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
      console.log(res);
      if (res?.error) {
        toast.error("Nesprávné heslo nebo email");
        return;
      } else {
        form.reset();
        router.replace("/");
      }
    } catch (err) {
      console.error("error:", err);
    }
  };

  const formSchema = z.object({
    email: z.string().email({ message: "Neplatný email" }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <section className="flex flex-col items-center justify-center w-full pt-10 h-dvh ">
      <motion.main
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex flex-col gap-3 px-10 py-8 text-center rounded-lg "
      >
        <h2 className="mb-5 font-bold sm-clamp ">Vítejte zpět! 👋</h2>
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-5"
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

            <button
              type="submit"
              className="p-3 mt-3 text-white transition-all duration-300 border-none rounded-lg outline-none cursor-pointer bg-primary hover:scale-105 hover:brightness-105 active:scale-95 active:brightness-95"
            >
              Přihlásit se
            </button>
          </form>
        </Form>
        <div className="w-full h-[2px] #bfc3cc] relative mt-5">
          <div className=" h-px bg-[#212121] w-full" />
          <span className="absolute px-3 -translate-x-1/2 bg-white left-1/2 -top-3">
            NEBO
          </span>
        </div>
        <div className="flex items-center justify-center my-5">
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
      </motion.main>
    </section>
  );
};

export default Login;
