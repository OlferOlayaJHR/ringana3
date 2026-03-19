import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#172D5F",
          indigo: "#413D93",
          "indigo-hover": "#362F7A",
          bg: "#F5F5F7",
          "bg-alt": "#EEEEF2",
          text: "#1D1D1F",
          "text-secondary": "#6E6E73",
          border: "#E0E0E5",
        },
      },
      boxShadow: {
        "brand-soft": "0 20px 50px -30px rgba(23, 45, 95, 0.35)",
        "brand-panel": "0 12px 30px -16px rgba(23, 45, 95, 0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #172D5F 0%, #413D93 100%)",
        "mesh-grid": "radial-gradient(circle at 0 0, rgba(65,61,147,0.12) 0%, transparent 45%), radial-gradient(circle at 100% 100%, rgba(23,45,95,0.1) 0%, transparent 45%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;


