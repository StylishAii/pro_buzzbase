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
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      colors: {
        white: "#F4F4F4",
        black: "#000000",
        main: "#2E2E2E",
        sub: "#424242",
        bg_sub: "#27272a",
        yellow: {
          50: "#FEFCE8",
          100: "#FDEDD3",
          200: "#FBDBA7",
          300: "#F9C97C",
          400: "#F7B750",
          500: "#e08e0a",
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
        red: {
          50: "#FEE7EF",
          100: "#FDD0DF",
          200: "#FAA0BF",
          300: "#F871A0",
          400: "#F54180",
          500: "#F31260",
          600: "#C20E4D",
          700: "#920B3A",
          800: "#610726",
          900: "#310413",
        },
        green: {
          50: "#E8FAF0",
          100: "#D1F4E0",
          200: "#A2E9C1",
          300: "#74DFA2",
          400: "#45D483",
          500: "#17C964",
          600: "#12A150",
          700: "#0E793C",
          800: "#095028",
          900: "#052814",
        },
        blue: {
          50: "#E6F1FE",
          100: "#CCE3FD",
          200: "#99C7FB",
          300: "#66AAF9",
          400: "#338EF7",
          500: "#006FEE",
          600: "#005BC4",
          700: "#004493",
          800: "#002E62",
          900: "#001731",
        },
      },
      fontSize: {
        xxs: "10px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "buzz-dark": {
          extend: "dark",
          colors: {
            background: "#2E2E2E",
            foreground: "#F4F4F4",
            primary: {
              DEFAULT: "#d08000",
              foreground: "#F4F4F4",
            },
          },
        },
      },
    }),
  ],
};
export default config;
