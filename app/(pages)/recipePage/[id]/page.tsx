import React from "react";
import { toast } from "sonner";
import Image from "next/image";
import avatar from "../../../../public/avatar.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
const getRecipeById = async (id: any) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/recipes/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      toast.error("Tento recept neexistuje");
    }
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
const page = async ({ params }: any) => {
  const { id } = params;
  const { recipe } = await getRecipeById(id);
  const {
    title,
    desc,
    ingredients,
    image,
    procedure,
    author,
    authorProfilePicture,
    authorId,
  } = recipe;
  return (
    <section className="mt-20 ">
      <div className="container">
        <h1 className="mb-10 font-bold text-center sm-clamp text-primary">
          {title}
        </h1>
        <div className="flex flex-col w-full gap-10 mb-10 md:mb-20 md:flex-row">
          <div className="flex flex-col gap-3 md:w-[50%] md:max-w-[50%] justify-center items-center md:justify-center sm:items-start w-full">
            <Image
              src={image}
              width={500}
              height={500}
              alt={`obrázek receptu ${title}`}
              className="object-cover w-full rounded-md"
            />
            <Link href={`/viewProfile/${authorId}`}>
              <div className="flex items-center gap-3 ">
                <span>Vytvořil: </span>
                <Avatar className=" h-[60px] w-[60px]">
                  <AvatarImage
                    alt="avatar"
                    className="object-cover rounded-lg "
                    src={authorProfilePicture || avatar}
                  />
                </Avatar>
                <span>{author}</span>
              </div>
            </Link>
          </div>
          <div
            className="flex flex-col gap-3 md:w-[50%] md:max-w-[50%]  items-center  w-full 
          "
          >
            <h3 className="text-center sm-clamp text-primary">Popis receptu</h3>
            <p className="text-center">{desc}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 mb-20 md:flex-row">
          <div className="flex flex-col gap-3 text-center md:w-[50%] w-full">
            <h3 className="sm-clamp text-primary">Ingredience</h3>
            {ingredients.map((ingredient: any, i: any) => (
              <p key={i} className="flex items-center justify-center gap-2 ">
                <span>{i + 1})</span>
                <span>{ingredient}</span>
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-3 text-center md:w-[50%] w-full ">
            <h3 className="sm-clamp text-primary">Postup</h3>
            {procedure.map((proc: any, i: any) => (
              <p key={i} className="flex items-center justify-center gap-2">
                <span>{i + 1})</span>
                <span>{proc}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
