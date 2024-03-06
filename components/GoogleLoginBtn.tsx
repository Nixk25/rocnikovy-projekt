"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
const GoogleLoginBtn = () => {
  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn("google", { callbackUrl: "/" });

    if (result?.error) {
      router.push("/login");
    }
  };
  return (
    <Button
      onClick={handleLogin}
      className="cursor-pointer flex gap-2  google transition-all duration-300 border-none bg-[#c71510]  text-white  hover:brightness-110 hover:bg-[#c71510] hover:scale-105 active:scale-95 active:brightness-95 text-lg "
    >
      Příhlásit se pomocí Google
      <span className="google">
        <FaGoogle fill="#fff" size={20} />
      </span>
    </Button>
  );
};

export default GoogleLoginBtn;
