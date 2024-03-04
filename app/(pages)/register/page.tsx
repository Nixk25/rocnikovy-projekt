"use client";

import React, { useState, FormEvent } from "react";
import { FaLock, FaEye, FaUser, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

//@ts-ignore
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
          name,
          email,
          password,
          profilePicture: profilePictureUrl,
        }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/login");
        toast.success("Uživatel zaregistrován");
      }
    } catch (err) {
      console.log("error occurred during registration ", err);
      toast.error("Nepodařilo se zaregistrovat");
    }
  };

  const MemoizedAvatarImage = React.memo(AvatarImage);

  return (
    <section className="flex justify-center items-center flex-col  w-screen mt-20  ">
      <main className=" text-center py-8 px-10 flex flex-col relative gap-3 rounded-lg w-max ">
        <h2 className=" font-bold sm-clamp ">Zaregistruj se</h2>
        <p className="text-sm mb-5">
          A připoj se k největší komunitě{" "}
          <span className="font-bold text-primary">domácích kuchařů</span>!
        </p>
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label className="text-start">Uživatelské jméno</label>
            <div className="w-full relative">
              <input
                onChange={(e) => setName(e.target.value)}
                autoFocus
                name="name"
                type="text"
                placeholder="Zadejte své jméno..."
                className="outline-2 outline-transparent shadow-lg  py-2 rounded-lg px-5 pl-10 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
              />
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-2" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-start">Email</label>
            <div className="w-full relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="Zadejte svůj email..."
                className="outline-2 outline-transparent shadow-lg px-5 py-2 rounded-lg pl-10 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
              />
              <IoMdMail className="absolute top-1/2 -translate-y-1/2 left-2" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-start">Heslo</label>
            <div className="w-full relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Zadejte své heslo"
                className="outline-2 shadow-lg px-5 py-2 rounded-lg pl-10 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
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

            {preview ? (
              <>
                <div className="mt-5 rounded-lg flex justify-center items-center flex-col">
                  <h3 className="text-lg mb-3">Váš profilový obrázek</h3>
                  <Avatar className="h-[150px] w-[150px]">
                    <MemoizedAvatarImage
                      className="rounded-lg object-cover "
                      src={preview}
                    />
                  </Avatar>
                </div>
              </>
            ) : (
              <CldUploadWidget
                uploadPreset="pmhofx0x"
                //@ts-ignore
                onSuccess={(result, { widget }) => {
                  //@ts-ignore
                  setProfilePictureUrl(result?.info?.url);
                  //@ts-ignore
                  setPreview(result?.info?.url);
                  //@ts-ignore
                  widget.close();
                  toast.success("Profilový obrázek byl nahrán");
                }}
                //@ts-ignore
                onError={toast.error("Nepovedlo se nahrát profilový obrázek")}
              >
                {({ open }) => {
                  function handleOnClick() {
                    open();
                  }
                  return (
                    <Button
                      type="button"
                      variant="outline"
                      className=" mt-5 outline-primary outline"
                      onClick={handleOnClick}
                    >
                      Nahrát profilový obrázek
                    </Button>
                  );
                }}
              </CldUploadWidget>
            )}
          </div>

          <button
            type="submit"
            className="p-3 bg-primary text-white border-none outline-none rounded-lg mt-3 cursor-pointer transition-all hover:scale-105 hover:brightness-105 active:scale-95 active:brightness-95"
          >
            Zaregistrovat se
          </button>
          <span>Už mezi nás patříte?</span>
          <Link className=" text-primary" href="/login">
            Přihlašte se
          </Link>
        </form>
      </main>
    </section>
  );
};

export default Register;
