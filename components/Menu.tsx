import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
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
  {
    name: "Katalog",
    href: "/catalog",
  },
];

type MenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
};

const Menu = ({ isOpen, closeMenu }: MenuProps) => {
  const { status } = useSession();
  const handleButtonClick = () => {
    closeMenu();
    signOut({ callbackUrl: "/login" });
  };

  const menuVariants = {
    initial: {
      x: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    animate: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      x: "-100%",
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const listVariants = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 w-full origin-left bg-white h-dvh"
        >
          <div className="container relative flex items-center justify-center h-full ">
            <motion.ul
              variants={listVariants}
              initial="initial"
              animate="visible"
              exit="initial"
              className="flex flex-col items-center justify-center gap-3 text-2xl font-bold transition-all duration-300 hover:text-primary"
            >
              {navLinks.map(({ name, href }, i) => {
                return (
                  <div key={i} className="overflow-hidden">
                    <NavLink closeMenu={closeMenu} name={name} href={href} />
                  </div>
                );
              })}
            </motion.ul>
            <button
              onClick={closeMenu}
              className="absolute text-white top-3 right-5 "
            >
              <X color="#212121" size={35} />
            </button>
            {status === "authenticated" ? (
              <Button
                onClick={handleButtonClick}
                className="absolute text-white -translate-x-1/2 bottom-5 left-1/2"
              >
                Odhlásit se
              </Button>
            ) : (
              <Button asChild>
                <Link
                  onClick={closeMenu}
                  className="absolute text-white -translate-x-1/2 bottom-5 left-1/2"
                  href="/login"
                >
                  Přihlásit se
                </Link>
              </Button>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

type navLinkProps = {
  name: string;
  href: string;
  closeMenu: () => void;
};

const NavLink = ({ name, href, closeMenu }: navLinkProps) => {
  const navLinkVariants = {
    initial: {
      x: "-30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0, 0.55, 0.45, 1],
      },
    },
  };
  return (
    <motion.div variants={navLinkVariants} onClick={closeMenu}>
      <Link href={href}>{name}</Link>
    </motion.div>
  );
};

export default Menu;
