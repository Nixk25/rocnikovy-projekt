import React from "react";
import { FaGoogle, FaFacebookF, FaApple, FaLock, FaEye } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

interface providers {
  name: string;
  icon: React.JSX.Element;
  color: string;
}

const providers: providers[] = [
  {
    name: "google",
    icon: <FaGoogle />,
    color: "#c71510",
  },
  {
    name: "facebook",
    icon: <FaFacebookF />,
    color: "#455ea9",
  },
  {
    name: "apple",
    icon: <FaApple />,
    color: "#515357",
  },
];

const Login = () => {
  return (
    <section className="flex justify-center items-center flex-col my-24 w-screen ">
      <main className=" text-center py-8 px-10 flex flex-col relative gap-3 rounded-lg ">
        <h2 className=" font-bold sm-clamp ">Zaregistruj se</h2>
        <p className="text-sm mb-5">
          A připoj se k největší komunitě domácích kuchařů!
        </p>
        <div className="flex flex-col w-full">
          <label className="text-start">Vaše jméno</label>
          <input
            autoFocus
            name="name"
            type="text"
            placeholder="Zadejte své jméno..."
            className="outline-2 outline-transparent shadow-lg  py-2 rounded-lg px-3 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-start">Email</label>
          <div className="w-full relative">
            <input
              name="email"
              type="email"
              placeholder="Zadejte svůj email..."
              className="outline-2 outline-transparent shadow-lg px-5 py-2 rounded-lg pl-10 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
            />
            <IoMdMail className="absolute top-1/2 -translate-y-1/2 left-2" />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-start">Heslo</label>
          <div className="w-full relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Zadejte své heslo"
              className="outline-2 shadow-lg px-5 py-2 rounded-lg pl-10 w-full focus-within:outline-primary focus-within:outline-2 transition-all duration-300 input"
            />
            <FaLock className="absolute top-1/2 -translate-y-1/2 left-2" />
            <FaEye className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 md:gap-10 md:flex-row flex-col gap-5  ">
          <div className="flex justify-start items-center gap-2 w-full">
            <input type="checkbox" className=" accent-primary" />
            <span>Zůstat přihlášený</span>
          </div>
          <span className="cursor-pointer hover:text-primary transition-all">
            {" "}
            Zapomenuté heslo?{" "}
          </span>
        </div>
        <button className="p-3 bg-primary text-white border-none outline-none rounded-lg mt-3 cursor-pointer transition-all hover:scale-105 hover:brightness-105 active:scale-95 active:brightness-95">
          Přihlásit se
        </button>
        <div className="w-full h-[2px] #bfc3cc] relative mt-5">
          <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white px-3">
            OR
          </span>
        </div>
        <div className="flex gap-5 justify-center items-center my-5">
          {providers.map((provider, i) => (
            <span
              key={i}
              className={`cursor-pointer text-xl ${provider.name} transition-all `}
            >
              {provider.icon}
            </span>
          ))}
        </div>
        <p className="flex flex-col gap-3">
          Ještě nepatříte mezi nás?
          <span className="cursor-pointer text-primary">Zaregistrujte se!</span>
        </p>
      </main>
    </section>
  );
};

export default Login;
