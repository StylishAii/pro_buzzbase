import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        main: "#2E2E2E",
        yellow: {
          50: "#FEFCE8",
          100: "#FDEDD3",
          200: "#FBDBA7",
          300: "#F9C97C",
          400: "#F7B750",
          500: "#F5A524",
          600: "#C4841D",
          700: "#936316",
          800: "#62420E",
          900: "#312107",
        },
        zic: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
