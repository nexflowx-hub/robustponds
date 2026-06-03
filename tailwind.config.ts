import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C52023",
          "dark-red": "#BE312C",
          heading: "#161922",
          "footer-bg": "#2C2C2C",
          "grey-section": "#ECECEC",
          "grey-bar": "#7E7E7E",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
