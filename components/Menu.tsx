import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

type navLinksType = {
  name: string;
  href: string;
};

const navLinks: navLinksType[] = [
  {
    name: "Domů",
    href: "/",
  },
  {
    name: "Co vařit",
    href: "#",
  },
];

type MenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
};

const Menu = ({ isOpen, closeMenu }: MenuProps) => {
  return (
    <section
      className={`absolute w-screen h-screen bg-[#212121] inset-0 z-50 transition-all duration-200 ${
        isOpen ? "" : "-left-[110%]"
      }`}
    >
      <div className="container relative h-full flex justify-center items-center ">
        <ul className="flex justify-center items-center flex-col gap-3 hover:text-primary transition-all duration-300 text-2xl font-bold">
          {navLinks.map((link, i) => {
            const { name, href } = link;
            return (
              <li key={i} className="text-white">
                <Link onClick={closeMenu} href={href}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          onClick={closeMenu}
          className="absolute top-3 right-5 text-white   "
        >
          <X color="white" size={35} />
        </button>
      </div>
    </section>
  );
};

export default Menu;
