"use client";
import Link from "next/link";
import avatar from "../public/avatar.png";
import logo from "../public/logo.svg";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
//@ts-ignore
import { useMediaQuery } from "react-responsive";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const isDesktop = useMediaQuery({
    query: "(min-width: 640px)",
  });
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: any) => {
    const prev = scrollY.getPrevious();
    //@ts-ignore
    if (latest > prev && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });
  const { status, data: session } = useSession();
  const pathname = usePathname();

  const isLoginOrRegister = ["/login", "/register"].includes(pathname);
  const isUser = ["/user"].includes(pathname);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => {
      const body = document.body;

      if (prevIsOpen) {
        body.style.overflow = "auto";
      } else {
        body.style.overflow = "hidden";
      }

      return !prevIsOpen;
    });
  };

  return (
    <motion.nav
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{
        type: "spring",
        duration: 0.3,
        stiffness: 260,
        damping: 20,
      }}
      className={`w-full bg-white/20 fixed top-0 left-0 backdrop-blur-md z-30 `}
    >
      <div className="container relative pt-3 mx-auto">
        <header className="w-full h-[80px] sm:h-max">
          <nav className="flex items-center justify-center p-4 sm:justify-between">
            <ul className="hidden gap-10 list-none  sm:flex">
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
                  href="/catalog"
                >
                  Katalog
                </Link>
              </li>
            </ul>
            {!isOpen && (
              <button
                className="absolute -translate-y-1/2  sm:hidden left-5 top-1/2"
                onClick={toggleMenu}
              >
                <IoMdMenu size={30} />
              </button>
            )}
            <Menu isOpen={isOpen} closeMenu={toggleMenu} />
            <Link
              href="/"
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              <Image
                src={logo}
                width={150}
                height={100}
                className="mt-3 cursor-pointer select-none hover:brightness-110 active:brightness-75 "
                alt="logo"
              />
            </Link>
            {!isUser && (
              <div className="absolute flex items-center justify-center -translate-y-1/2 right-5 top-1/2">
                {status === "unauthenticated" && !isLoginOrRegister && (
                  <Link
                    href="/login"
                    className="hidden outline-none hover:text-primary focus-visible:text-primary active:brightness-75 sm:flex"
                  >
                    Přihlásit se
                  </Link>
                )}

                {status === "authenticated" ? (
                  isDesktop ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar className="outline-none  outline-offset-0 outline-black">
                          <AvatarImage
                            alt="avatar"
                            className="object-cover rounded-lg "
                            src={
                              session?.user?.image ||
                              //@ts-ignore
                              session?.user?.profilePicture
                            }
                          />
                          <AvatarFallback className=" size-full text-white bg-primary text-xl font-semibold">
                            {session?.user?.name
                              ?.split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="mr-5 mt-2
                    "
                      >
                        <div className="flex gap-3 items-center p-2">
                          <Avatar>
                            <AvatarImage
                              alt="avatar"
                              className="object-cover rounded-lg "
                              src={
                                session?.user?.image ||
                                //@ts-ignore
                                session?.user?.profilePicture
                              }
                            />
                            <AvatarFallback className=" size-full text-white bg-primary text-xl font-semibold">
                              {session?.user?.name
                                ?.split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{session?.user?.name}</span>
                        </div>
                        <Link href="/user">
                          <DropdownMenuItem className="outline-none cursor-pointer hover:text-primary focus-visible:text-primary active:brightness-75">
                            Můj účet
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/addNewRecipe">
                          <DropdownMenuItem className="outline-none cursor-pointer hover:text-primary focus-visible:text-primary active:brightness-75">
                            Přidat recept
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link onClick={() => signOut()} href="/login">
                          <DropdownMenuItem className="outline-none cursor-pointer hover:text-primary focus-visible:text-primary active:brightness-75">
                            Odhlásit se
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Sheet>
                      <SheetTrigger>
                        <Avatar className="outline-none  outline-offset-0 outline-black">
                          <AvatarImage
                            alt="avatar"
                            className="object-cover rounded-lg "
                            src={
                              session?.user?.image ||
                              //@ts-ignore
                              session?.user?.profilePicture
                            }
                          />
                          <AvatarFallback className=" size-full text-white bg-primary text-xl font-semibold">
                            {session?.user?.name
                              ?.split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </SheetTrigger>
                      <SheetContent className="w-[200px] flex flex-col gap-3">
                        <div className="flex gap-3 items-center p-2">
                          <Avatar>
                            <AvatarImage
                              alt="avatar"
                              className="object-cover rounded-lg "
                              src={
                                session?.user?.image ||
                                //@ts-ignore
                                session?.user?.profilePicture
                              }
                            />
                            <AvatarFallback className=" size-full text-white bg-primary text-xl font-semibold">
                              {session?.user?.name
                                ?.split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{session?.user?.name}</span>
                        </div>
                        <Link href="/user">
                          <div className="outline-none cursor-pointer hover:text-primary focus-visible:text-primary active:brightness-75">
                            Můj účet
                          </div>
                        </Link>
                        <Link
                          href="/addNewRecipe"
                          className="border-b border-slate-200 w-full pb-2"
                        >
                          <div className="outline-none cursor-pointer hover:text-primary focus-visible:text-primary active:brightness-75">
                            Přidat recept
                          </div>
                        </Link>
                        <Link onClick={() => signOut()} href="#">
                          <Button className="outline-none text-white cursor-pointer hover:text-primary focus-visible:text-primary active:brightness-75">
                            Odhlásit se
                          </Button>
                        </Link>
                      </SheetContent>
                    </Sheet>
                  )
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
    </motion.nav>
  );
};

export default Navbar;
