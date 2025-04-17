import type { Config } from "tailwindcss";


// tailwind.config.js
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#393e46", // Dark Gray for text
        background: "#ededed", // Light Gray background
        primary: "#abd8d3", // Soft Cyan
        secondary: "#126e82", // Deep Teal
        accent: "#00aab3", // Bright Teal
      },
      fontFamily: {
        vithkuqi: ["Noto Serif Vithkuqi", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
