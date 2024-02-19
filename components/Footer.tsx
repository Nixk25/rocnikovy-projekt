import Image from "next/image"
import Link from "next/link"
import logo from "../public/logo.svg"
 import { Facebook } from 'lucide-react';
 import { Instagram } from 'lucide-react';
 import { Twitter } from 'lucide-react';
 import { Youtube } from 'lucide-react';
 import { Mail } from 'lucide-react';
 const Footer = () => {
  return (
    <footer className="border border-t-[#bfc3cc] relative">
      <div className="container mx-auto">
        <div className="flex justify-center items-center flex-col gap-5 pt-5">
            <Link href="#">
            
            <Image src={logo} width={150} height={50} alt="logo cookify" />
            </Link>
          <div className="text-center flex justify-center items-center gap-3 flex-col">
            <h3>Přihlásit se k newsletteru</h3>
            <span>Dostávejte novinky o nových receptech</span>
            <div className="relative w-full flex ">
              <input className="w-full py-3  px-12 rounded-lg transition-all outline-2 outline-transparent focus:outline-primary " type="email" required placeholder="Váš e-mail.." />
              <Mail  className="absolute top-1/2 left-0 -translate-y-1/2  text-[#bfc3cc] w-[3rem]"/>
              <button className="absolute right-0 top-0 h-full bg-primary rounded-tr-lg rounded-br-lg border-none outline-none text-white px-3 cursor-pointer hover:brightness-110 focus-visible:brightness-110 active:brightness-100 transition-all ">Odebírat</button>
            </div>
          </div>
          <div className="relative flex justify-center items-center text-[#bfc3cc] pb-3 gap-4">
            <span> ©2023 Cookify s.r.o. </span>
            <span> · </span>
            <span className="cursor-pointer">Ochrana osobních údajů</span>
          </div>
          <div className=" md:absolute bottom-3 left-3/4 flex justify-center items-center gap-5 pb-5 md:pb-0 text-xl transition-all">
            <Link  href="#"><Facebook/></Link>
            <Link href="#"><Instagram/></Link>
            <Link href="#"><Twitter/></Link>
            <Link href="#"><Youtube/></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer