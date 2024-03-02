"use client";
import Link from "@/node_modules/next/link";
import avatar from "../public/avatar.png";
import logo from "../public/logo.svg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { status, data: session } = useSession();
  const pathname = usePathname();

  const isLoginOrRegister = ["/login", "/register"].includes(pathname);

  return (
    <nav className="w-full bg-white/20 fixed top-0 left-0 backdrop-blur-md z-10 ">
      <div className="container mx-auto relative">
        <header className="w-full h-[80px] sm:h-max">
          <nav className="flex justify-center sm:justify-between items-center p-4">
            <ul className=" list-none sm:flex gap-10 hidden">
              <li className="link">
                <Link
                  className="text-black select-none hover:text-primary focus-visible:text-primary outline-none active:text-[#02b192]  active"
                  href="/"
                >
                  Domů
                </Link>
              </li>
              <li className="link">
                <Link
                  className="text-black select-none hover:text-primary focus-visible:text-primary outline-none active:text-[#02b192] "
                  href="stepper.html"
                >
                  Co vařit
                </Link>
              </li>
            </ul>
            <Link
              href="/"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Image
                src={logo}
                width={150}
                height={100}
                className="mt-3 select-none cursor-pointer hover:brightness-110 active:brightness-75 "
                alt="logo"
              />
            </Link>

            <div className=" hidden sm:flex justify-center items-center gap-5">
              {status === "authenticated" ? (
                <Link
                  onClick={() => signOut()}
                  href="/login"
                  className="hover:text-primary focus-visible:text-primary outline-none active:brightness-75"
                >
                  Odhlásit se
                </Link>
              ) : !isLoginOrRegister ? (
                <Link
                  href="/login"
                  className="hover:text-primary focus-visible:text-primary outline-none active:brightness-75"
                >
                  Přihlásit se
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hover:text-primary focus-visible:text-primary outline-none active:brightness-75 hidden"
                >
                  Přihlásit se
                </Link>
              )}
              {status === "authenticated" ? (
                <Link href="/user">
                  <Image
                    // @ts-ignore
                    src={
                      session?.user?.image ||
                      //@ts-ignore
                      session?.user?.profilePicture ||
                      avatar
                    }
                    width={40}
                    height={50}
                    alt="avatar"
                    className="rounded-lg object-cover h-[50px] w-[50px]"
                  />
                </Link>
              ) : (
                <Image
                  src={avatar}
                  height={70}
                  width={70}
                  className="rounded-lg cursor-not-allowed"
                  alt="avatar"
                />
              )}
            </div>
          </nav>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
