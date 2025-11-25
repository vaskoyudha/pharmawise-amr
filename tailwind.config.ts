import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#0B0F19",
          foreground: "#F7FBFF",
        },
        aurora: {
          50: "#EEF8FF",
          100: "#D9F0FF",
          200: "#B3E0FF",
          300: "#7ACBFF",
          400: "#3FB4FF",
          500: "#0094FF",
          600: "#0071DB",
          700: "#0055B7",
          800: "#003A93",
          900: "#002772",
        },
        neon: "#5EFCE8",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "grid-glow": "radial-gradient(circle at center, rgba(94,252,232,0.25), transparent 45%)",
      },
      boxShadow: {
        glass: "0 20px 80px rgba(0, 20, 51, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;


