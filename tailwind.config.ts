import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1720",
        navy: "#102235",
        slate: "#526371",
        mist: "#eef5f3",
        cloud: "#f8fbfa",
        line: "#d8e3df",
        teal: "#087f82",
        mint: "#d9f2ec",
        lime: "#b9d96b",
        amber: "#c7841d"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter Tight", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 34, 53, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;

