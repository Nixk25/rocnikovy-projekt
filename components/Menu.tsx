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
      translateX: "-100%",
    },
    animate: {
      translateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      translateX: "-100%",
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
          className="fixed w-full h-screen bg-white inset-0 z-50 origin-left"
        >
          <div className="container relative h-full flex justify-center items-center ">
            <motion.ul
              variants={listVariants}
              initial="initial"
              animate="visible"
              exit="initial"
              className="flex justify-center items-center flex-col gap-3 hover:text-primary transition-all duration-300 text-2xl font-bold"
            >
              {navLinks.map(({ name, href }, i) => {
                return (
                  <div className="overflow-hidden">
                    <NavLink
                      closeMenu={closeMenu}
                      key={i}
                      name={name}
                      href={href}
                    />
                  </div>
                );
              })}
            </motion.ul>
            <button
              onClick={closeMenu}
              className="absolute top-3 right-5 text-white   "
            >
              <X color="#212121" size={35} />
            </button>
            {status === "authenticated" ? (
              <Button
                onClick={handleButtonClick}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white"
              >
                Odhlásit se
              </Button>
            ) : (
              <Button asChild>
                <Link
                  onClick={closeMenu}
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white"
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
