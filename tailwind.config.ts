import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "up-lg": "0 -10px 15px rgba(0, 0, 0, 0.1)", // Shadow going upwards
        "up-md": "0 -4px 10px rgba(0, 0, 0, 0.1)", // A medium upward shadow
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        // Add more fonts if needed
      },
      colors: {
        ...defaultTheme.colors,
        primary: {
          DEFAULT: "#9A6C34",
          50: "#E1C6A5",
          100: "#DBBC96",
          200: "#D1A977",
          300: "#C79559",
          400: "#B9813E",
          500: "#9A6C34",
          600: "#704F26",
          700: "#463118",
          800: "#1C140A",
          900: "#000000",
          950: "#000000",
        },
        secondary: {
          DEFAULT: "#166064",
          50: "#57D3DA",
          100: "#47CFD6",
          200: "#2CC0C8",
          300: "#25A0A7",
          400: "#1D8085",
          500: "#166064",
          600: "#0C3436",
          700: "#020808",
          800: "#000000",
          900: "#000000",
        },
        green: {
          DEFAULT: "#8be582",
          40: "#E7F9F4",
          50: "#DAF8E6", // BG status
          100: "#b9efb4",
          200: "#aeeda8",
          300: "#a2ea9b",
          400: "#97e88f",
          500: "#8be582", // main
          550: "#66CB9F",
          600: "#22AD5C", // Button Pass
          650: "#13C296",
          700: "#0C9A00", // BG button invite
          800: "#1A8245", // Text status
          900: "#006516",
          950: "#2a4527",
        },
        correct: {
          DEFAULT: "#4FA73C",
          50: "#EBF7E8",
          100: "#DBF0D6",
          200: "#B6E1AC",
          300: "#92D283",
          400: "#6DC45A",
          500: "#4FA73C",
          600: "#408731",
          700: "#306524",
          800: "#204418",
          900: "#10220C",
          950: "#070F05",
        },
        gray: {
          50: "#FFFFFF", // BG layout
          75: "#FAFAFA", // Gray BG
          100: "#F7F9F9",
          150: "#E0E2E6",
          175: "#EEEEEE",
          200: "#F5F5F5",
          225: "#E2E2E2",
          250: "#ECEFF4", // google login
          275: "#E9E9E9",
          300: "#DFDFDF",
          350: "#D9D9D9",
          400: "#CACACA",
          450: "#DFE4EA",
          500: "#B1B1B1", //Gray 1
          600: "#A8A8A8",
          700: "#979797", // Gray
          800: "#757575",
          825: "#5C5C5C",
          850: "#505050",
          900: "#4F4F4F",
          950: "#222222",
          975: "#637381",
          1000: "#667085", // Title topic Card
        },
        error: {
          DEFAULT: "#D04E41",
          50: "#FEEBEB", //Bg Reject Status
          100: "#F0C6C2",
          200: "#E08880",
          300: "#D04E41",
          400: "#BC3A2F",
          500: "#F23030", // Didn't pass
          550: "#E42131",
          600: "#E10E0E", // Reject
          650: "#E64340",
          700: "#5E1D17",
          800: "#3D130F",
          900: "#210A08",
          950: "#100504",
        },
        black: {
          DEFAULT: "#2D2C2C",
          20: "#E5E7EB",
          25: "#CBD4E1",
          35: "#C9C9DA",
          50: "#9AA8BC",
          55: "#9A9A9A",
          60: "#999FAA",
          70: "#CCCCCC",
          75: "#858993",
          80: "#828F9A",
          90: "#637381",
          95: "#484848",
          100: "#728197",
          110: "#374151",
          120: "#4A4A4A",
          125: "#828282",
          130: "#292929",
          150: "#1D1D1D",
          200: "#1A212B",
          300: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
