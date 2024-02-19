import Link from "@/node_modules/next/link"
import avatar from "../public/avatar.png"
import logo from "../public/logo.svg"
import Image from "next/image"
const Navbar = () => {
  return (
    <nav className="w-full bg-white/20 fixed top-0 left-0 backdrop-blur-md z-10">
      <div className="container mx-auto">
        <header className="w-full h-max">
          <nav className="flex justify-between items-center p-4">
            <ul className=" list-none flex gap-10">
              <li className="link"><Link className="text-black select-none hover:text-primary focus-visible:text-primary outline-none active:text-[#02b192]  active" href="#">Home</Link></li>
              <li className="link">
                <Link className="text-black select-none hover:text-primary focus-visible:text-primary outline-none active:text-[#02b192] " href="stepper.html">Co vařit</Link>
              </li>
            </ul>
            <Link href="#home">
                <Image src={logo} width={150} height={100} className="mt-3 select-none cursor-pointer hover:brightness-110 active:brightness-75 " alt="logo" />
            </Link>
            <div className="flex justify-center items-center gap-5">
              <Link href="login.html" className="hover:text-primary focus-visible:text-primary outline-none active:brightness-75">Přihlásit se 
              </Link>
              <Link href="user.html">
                <Image src={avatar} alt="avatar" />
              </Link>
            </div>
          </nav>
        </header>
      </div>
    </nav>
  )
}

export default Navbar