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
        // CHARCOAL GRAY SCALE
        charcoal: {
          950: "#080b0f", // Deepest technical charcoal canvas
          900: "#0e1219", // Primary card and container background
          850: "#131922", // Elevated surfaces and headers
          800: "#1c2432", // Charcoal borders and dividers
          750: "#242f40", // Hover borders and accents
          700: "#2e3a4e",
          600: "#43526c",
          500: "#5f718f",
          400: "#8294b0",
          300: "#a8b8cf",
          200: "#cbd5e1",
          100: "#e2e8f0",
          50: "#f1f5f9",
          DEFAULT: "#0e1219",
        },

        // MOONLIT SILVER SCALE
        silver: {
          50: "#ffffff",
          100: "#f8fafc",
          200: "#f1f5f9",
          300: "#e2e8f0",
          400: "#cbd5e1",
          500: "#94a3b8",
          600: "#64748b",
          700: "#475569",
          800: "#334155",
          900: "#1e293b",
          DEFAULT: "#f8fafc",
          glow: "rgba(248, 250, 252, 0.25)",
        },

        // SINGLE RED NEON SCALE
        neon: {
          50: "#fff0f2",
          100: "#ffe0e4",
          200: "#ffc2cb",
          300: "#ff94a2",
          400: "#ff4d64",
          500: "#ff1e38", // The signature Single Red Neon
          600: "#e50b25",
          700: "#bd041b",
          800: "#9b071a",
          900: "#7f0c1b",
          950: "#48010b",
          DEFAULT: "#ff1e38",
          glow: "rgba(255, 30, 56, 0.4)",
          subtle: "rgba(255, 30, 56, 0.12)",
        },

        // Standardized Slate (Moonlit Silver tint for light mode)
        slate: {
          50: "#f8fafc", // Crisp light silver background
          100: "#f1f5f9", // Silver input/badge surface
          150: "#e9edf3",
          200: "#e2e8f0", // Clean silver border
          250: "#d7e0ea",
          300: "#cbd5e1",
          350: "#b4c3d4",
          400: "#94a3b8", // Muted subtext
          500: "#64748b",
          600: "#475569", // Dark charcoal subtext
          700: "#334155", // Charcoal body text
          800: "#1e293b", // Deep charcoal text
          850: "#141c2b",
          900: "#0f172a", // Charcoal heading text
          950: "#020617",
        },

        // Dark Theme tokens mapping directly to Charcoal & Moonlit Silver
        dark: {
          950: "#080b0f", // Deepest Charcoal Canvas
          900: "#0e1219", // Charcoal card base
          850: "#131922", // Elevated surface
          800: "#1c2432", // Charcoal border
          750: "#242f40", // Hover border
          700: "#2e3a4e",
          600: "#43526c",
          500: "#64748b",
          400: "#94a3b8", // Moonlit silver muted text
          300: "#cbd5e1", // Moonlit silver secondary text
          200: "#e2e8f0", // Moonlit silver high-contrast text
          100: "#f8fafc", // Crisp moonlit silver headings
        },

        // Primary Accent: Single Red Neon
        primary: {
          DEFAULT: "#ff1e38",
          50: "#fff0f2",
          100: "#ffe0e4",
          200: "#ffc2cb",
          300: "#ff94a2",
          400: "#ff4d64",
          500: "#ff1e38",
          600: "#e50b25",
          700: "#bd041b",
          800: "#9b071a",
          900: "#0e1219",
          glow: "rgba(255, 30, 56, 0.35)",
        },

        // Legacy alias maps to avoid broken references
        gold: {
          500: "#ff1e38", // Aliased to single red neon
          600: "#e50b25",
          700: "#bd041b",
          DEFAULT: "#ff1e38",
          light: "#ff4d64",
          glow: "rgba(255, 30, 56, 0.25)",
        },
        rose: {
          400: "#ff4d64",
          500: "#ff1e38",
          600: "#e50b25",
          DEFAULT: "#ff1e38",
          glow: "rgba(255, 30, 56, 0.35)",
        },
        cerulean: {
          300: "#e2e8f0", // Moonlit silver
          400: "#cbd5e1", // Moonlit silver highlight
          500: "#ff1e38", // Primary neon red
          DEFAULT: "#ff1e38",
          glow: "rgba(255, 30, 56, 0.25)",
        },
        ivory: {
          50: "#f8fafc",
          100: "#f1f5f9",
          DEFAULT: "#f8fafc",
        },
        navy: {
          500: "#43526c",
          600: "#2e3a4e",
          900: "#0e1219",
          DEFAULT: "#0e1219",
        },
        java: {
          DEFAULT: "#ff4d64",
          glow: "rgba(255, 77, 100, 0.2)",
        },
        spring: {
          DEFAULT: "#ff1e38",
          glow: "rgba(255, 30, 56, 0.2)",
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
        "laser-pulse": "laser 2s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: 0.15, transform: "scale(1)" },
          "50%": { opacity: 0.35, transform: "scale(1.06) translate(10px, -10px)" },
        },
        laser: {
          "0%, 100%": { opacity: 0.8 },
          "50%": { opacity: 0.4 },
        }
      }
    },
  },
  plugins: [],
}
