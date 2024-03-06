import React from "react";
import EditUser from "@/components/EditUser";
const getUserById = async (id: any) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Could not find user");
    }
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const editProfile = async ({ params }: any) => {
  const { id } = params;
  const { user } = await getUserById(id);
  const { name, email, profilePicture } = user;
  return (
    <EditUser
      id={id}
      name={name}
      email={email}
      profilePicture={profilePicture}
    />
  );
};

export default editProfile;
