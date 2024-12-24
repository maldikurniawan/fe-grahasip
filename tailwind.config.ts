import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          base: "#378ecc",
          baseHover: "#2e74a6",
          baseActive: "#235c84",
          dark: "#3c73bc",
          light: "#34b1e7",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
