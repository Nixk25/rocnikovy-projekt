"use client";
import Link from "next/link";
import avatar from "../public/avatar.png";
import logo from "../public/logo.svg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import Menu from "./Menu";

const Navbar = () => {
  const { status, data: session } = useSession();
  const pathname = usePathname();

  const isLoginOrRegister = ["/login", "/register"].includes(pathname);
  const isUser = ["/user"].includes(pathname);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav
      className={`w-full bg-white/20 fixed top-0 left-0 backdrop-blur-md z-10 `}
    >
      <div className="container mx-auto relative pt-3">
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
              <li className="link">
                <Link
                  className="text-black select-none hover:text-primary focus-visible:text-primary outline-none active:text-[#02b192] "
                  href="stepper.html"
                >
                  Katalog
                </Link>
              </li>
            </ul>
            {!isOpen && (
              <button
                className=" sm:hidden absolute left-5 top-1/2 -translate-y-1/2 "
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <IoMdMenu size={30} />
              </button>
            )}
            <Menu isOpen={isOpen} closeMenu={closeMenu} />
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
            {!isUser && (
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex justify-center items-center">
                {status === "unauthenticated" && !isLoginOrRegister && (
                  <Link
                    href="/login"
                    className="hover:text-primary focus-visible:text-primary outline-none active:brightness-75"
                  >
                    Přihlásit se
                  </Link>
                )}
                {status === "authenticated" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className=" outline-none outline-offset-0 outline-black">
                        <AvatarImage
                          alt="avatar"
                          className="rounded-lg object-cover h-[50px] w-[50px]"
                          src={
                            session?.user?.image ||
                            //@ts-ignore
                            session?.user?.profilePicture ||
                            avatar
                          }
                        />
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href="/user">
                        <DropdownMenuItem className="hover:text-primary focus-visible:text-primary outline-none active:brightness-75 cursor-pointer">
                          Můj účet
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <Link onClick={() => signOut()} href="/login">
                        <DropdownMenuItem className="hover:text-primary focus-visible:text-primary outline-none active:brightness-75 cursor-pointer">
                          Odhlásit se
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
            )}
          </nav>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
