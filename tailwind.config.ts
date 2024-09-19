import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sarabun: ["var(--font-sarabun)"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom, rgba(243, 243, 243, 1), rgba(80, 194, 255, 0.5))",
      },
    },
  },
  plugins: [],
};
export default config;
