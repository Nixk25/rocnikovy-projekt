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
    <section className=" mt-20">
      <div className="container">
        <h1 className="mb-10 clamp text-primary font-bold text-center">
          {title}
        </h1>
        <div className="flex gap-10 mb-20">
          <div className="flex flex-col gap-3 w-[50%] max-w-[50%]">
            <Image
              src={image}
              width={500}
              height={500}
              alt={`obrázek receptu ${title}`}
              className="w-full object-cover rounded-md"
            />
            <Link href={`/viewProfile/${authorId}`}>
              <div className="flex gap-3 items-center ">
                <span>Vytvořil: </span>
                <Avatar className=" h-[60px] w-[60px]">
                  <AvatarImage
                    alt="avatar"
                    className="rounded-lg object-cover "
                    src={authorProfilePicture || avatar}
                  />
                </Avatar>
                <span>{author}</span>
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-5 text-center ">
            <h3 className="sm-clamp text-primary ">Popis receptu</h3>
            <p>{desc}</p>
          </div>
        </div>
        <div className="flex gap-10 mb-20">
          <div className="flex flex-col gap-5 text-center w-[50%]">
            <h3 className="sm-clamp text-primary">Ingredience</h3>
            <p>{ingredients}</p>
          </div>
          <div className="flex flex-col gap-5 text-center w-[50%] ">
            <h3 className="sm-clamp text-primary">Postup</h3>
            <p>{procedure}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
