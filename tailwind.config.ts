import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Jobbase brand theme palette
        background: "#fcfafe",
        foreground: "#000000",
        primary: {
          DEFAULT: "#1D74C1",
          hover: "#175fa3",
          light: "#e8f1fb",
          muted: "#d0e5f7",
        },
        secondary: {
          DEFAULT: "#F3F7FE",
          hover: "#e2ecfd",
        },
        accent: {
          DEFAULT: "#353535",
          hover: "#242424",
          muted: "#4a4a4a",
        },
        surface: {
          50: "#fcfafe",
          100: "#F3F7FE",
          200: "#e2ecfd",
          800: "#353535",
          900: "#242424",
          950: "#111111",
        },
        brand: {
          blue: "#1D74C1",
          blueDark: "#175fa3",
          blueLight: "#e8f1fb",
          charcoal: "#353535",
        }
      },
      fontFamily: {
        heading: ["'Instrument Serif'", "Georgia", "serif"],
        subheading: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        body: ["Poppins", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        poppins: ["Poppins", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["'Instrument Serif'", "'IBM Plex Serif'", "serif"],
        avenue: ["'Avenue'", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      }
    },
  },
  plugins: [],
};
export default config;
