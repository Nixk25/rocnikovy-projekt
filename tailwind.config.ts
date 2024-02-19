import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#02b192",
        secondary:"#20a203",
        accent:"#bffef3",
        text:"#333",
      },
      backgroundImage:{
        "hero": "url('../public/bg-hero.png')"
      }
    },
  },
  plugins: [],
};
export default config;
