/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#030303", // deep black
          900: "#0a0a0a", // card background
          800: "#121212", // card border highlight
          700: "#1a1a1a",
          600: "#262626", // stroke color
          400: "#a3a3a3", // secondary text
          200: "#e5e5e5", // main text
        },
        primary: {
          DEFAULT: "#0070f3", // Vercel blue
          50: "#f0f7ff",
          100: "#e0effe",
          500: "#0070f3",
          600: "#0062d2",
          900: "#0c3b80",
        },
        java: {
          DEFAULT: "#f89820", // Java Orange
          glow: "rgba(248, 152, 32, 0.15)",
        },
        spring: {
          DEFAULT: "#6db33f", // Spring Green
          glow: "rgba(109, 179, 63, 0.15)",
        }
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Outfit", "Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-slow": "glow 10s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: 0.1, transform: "scale(1)" },
          "50%": { opacity: 0.2, transform: "scale(1.05) translate(10px, -10px)" },
        }
      }
    },
  },
  plugins: [],
}
