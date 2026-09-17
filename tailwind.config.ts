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
        background: "#09090B",
        foreground: "#FAFAFA",
        surface: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          800: "#18181B",
          900: "#09090B",
          950: "#040405",
        },
        brand: {
          indigo: "#4F46E5",
          purple: "#7C3AED",
          violet: "#8B5CF6",
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
