import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import { ReactElement } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface socials {
  name: string;
  link: string;
  icon: ReactElement;
}

const socials: socials[] = [
  { name: "Facebooku", icon: <FaFacebookF />, link: "#" },
  { name: "Instagramu", icon: <FaInstagram />, link: "#" },
  { name: "Twitteru", icon: <FaTwitter />, link: "#" },
  { name: "Youtube", icon: <FaYoutube />, link: "#" },
];

const Footer = () => {
  return (
    <footer className="relative">
      <div className="container mx-auto">
        <div className="flex justify-center items-center flex-col gap-5 pt-5">
          <Link href="#">
            <Image src={logo} width={150} height={50} alt="logo cookify" />
          </Link>
          <div className="text-center flex justify-center items-center gap-3 flex-col">
            <h3>Přihlásit se k newsletteru</h3>
            <div className="relative w-full flex  ">
              <input
                className="w-full py-3  px-12 rounded-lg transition-all duration-300 outline-2 outline-transparent focus:outline-primary input "
                type="email"
                required
                placeholder="Váš e-mail.."
              />
              <FaEnvelope className="absolute top-1/2 left-0 -translate-y-1/2  text-[#bfc3cc] w-[3rem]" />
              <button className="absolute right-0 top-0 h-full bg-primary rounded-tr-lg rounded-br-lg border-none outline-none text-white px-3 cursor-pointer hover:brightness-110 focus-visible:brightness-110 active:brightness-100 transition-all ">
                Odebírat
              </button>
            </div>
          </div>
          <div className="relative flex flex-col sm:flex-row justify-center items-center text-[#bfc3cc] pb-3 gap2 sm:gap-4">
            <span> ©2023 Cookify s.r.o. </span>
            <span className="hidden sm:flex"> · </span>
            <span className="cursor-pointer">Ochrana osobních údajů</span>
          </div>
          <div className=" md:absolute bottom-3 left-3/4 flex justify-center items-center gap-5 pb-5 md:pb-0 text-xl transition-all">
            {socials.map((social, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={social.link}>{social.icon}</Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Sledujte nás na{" "}
                      <span className="text-primary font-bold">
                        {social.name}
                      </span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
