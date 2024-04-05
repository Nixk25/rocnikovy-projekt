"use client";
import React, { useState, useEffect } from "react";
import EditUser from "@/components/EditUser";
import Loading from "@/app/loading";

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
    console.error(err);
  }
};

const EditProfile = ({ params }: any) => {
  const { id } = params;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(id);
      setUser(userData.user);
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <Loading />;
  }

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

export default EditProfile;
