"use client";

import React from "react";
import { useSession } from "next-auth/react";
import avatar from "../../../public/avatar.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
const User = () => {
  const { status, data: session } = useSession();
  return (
    <section className="h-dvh mt-20 ">
      <div className="container">
        <h1 className="sm-clamp font-bold">
          Dobrý den, <span className="text-primary">{session?.user?.name}</span>
          !
        </h1>
        <div className="mt-10 flex items-center gap-10 ">
          {status === "authenticated" ? (
            <Avatar className=" h-[200px] w-[200px]">
              <AvatarImage
                alt="avatar"
                className="rounded-lg object-cover "
                src={
                  session?.user?.image ||
                  //@ts-ignore
                  session?.user?.profilePicture ||
                  avatar
                }
              />
            </Avatar>
          ) : (
            <Image
              src={avatar}
              height={70}
              width={70}
              className="rounded-lg cursor-not-allowed"
              alt="avatar"
            />
          )}

          <div className="flex flex-col gap-7">
            <h2 className="text-2xl font-semibold">Informace o vašem účtu</h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <FaUser fill="#02b192" />
                <h3 className="text-lg font-semibold">Vaše jméno:</h3>
                <p>{session?.user?.name}</p>
              </div>
              <div className="flex gap-3 items-center">
                <IoMdMail fill="#02b192" />
                <h3 className="text-lg font-semibold">Email:</h3>
                <p>{session?.user?.email}</p>
              </div>
              {session?.user?.provider !== "google" && (
                <Link href={`/editProfile/${session?.user.id}`}>
                  <Button className="text-white">Upravit váš profil</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
