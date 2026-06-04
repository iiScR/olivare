import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#111111",
        "surface-elevated": "#1A1A1A",
        primary: "#C6A43F",
        "primary-hover": "#D4B44F",
        "primary-glow": "rgba(198,164,63,0.3)",
        secondary: "#4A0E17",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0A0A0",
        "text-muted": "#666666",
        border: "#2A2A2A",
        "border-hover": "#3A3A3A",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "breathe": "breathe 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(198,164,63,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(198,164,63,0.4)" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(198,164,63,0.3)",
        "glow-lg": "0 0 40px rgba(198,164,63,0.4)",
        card: "0 4px 20px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
}

export default config
