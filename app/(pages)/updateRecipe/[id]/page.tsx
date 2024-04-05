import React from "react";
import EditRecipe from "@/components/EditRecipe";
const getRecipeById = async (id: any) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/recipes/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Could not find receipt");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

const editProfile = async ({ params }: any) => {
  const { id } = params;
  const { recipe } = await getRecipeById(id);
  const { title, ingredients, procedure, time, desc, image } = recipe;
  return (
    <EditRecipe
      id={id}
      title={title}
      ingredients={ingredients}
      procedure={procedure}
      time={time}
      desc={desc}
      image={image}
    />
  );
};

export default editProfile;
