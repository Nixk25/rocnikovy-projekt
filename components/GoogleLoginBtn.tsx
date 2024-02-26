"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
const GoogleLoginBtn = () => {
  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn("google", { callbackUrl: "/user" });

    if (result?.error) {
      router.push("/login");
    }
  };
  return (
    <Button
      onClick={handleLogin}
      className="cursor-pointer flex gap-2  google transition-all duration-300 border-none bg-[#c71510]  text-white hover:bg-transparent hover:text-[#c71510] hover:brightness-100 text-lg "
    >
      Příhlásit se pomocí
      <span className="google">
        <FaGoogle fill="#fff" size={20} />
      </span>
    </Button>
  );
};

export default GoogleLoginBtn;
