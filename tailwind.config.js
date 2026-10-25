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
        // LIGHT MODE PALETTE: Ivory, Gold, and Deep Atlas Navy
        ivory: {
          50: "#fdfcf9", // Canvas light ivory
          100: "#faf6eb", // Warm soft ivory surface
          150: "#f5efe1", // Light panel background
          200: "#ece3cf", // Warm ivory border
          250: "#e1d5be", // Active ivory border
          300: "#d5c6aa",
          400: "#b5a281",
          500: "#8f7e5f",
          DEFAULT: "#faf6eb",
        },
        gold: {
          50: "#fdfbf4",
          100: "#f8f3dc",
          200: "#efe4b2",
          300: "#e3cf80",
          400: "#d7ba52",
          500: "#c59828", // Rich warm gold
          600: "#a97e1a", // Deep antique gold
          700: "#876212",
          800: "#694b0d",
          900: "#4c3508",
          DEFAULT: "#c59828",
          light: "#d4af37",
          glow: "rgba(197, 152, 40, 0.22)",
        },
        navy: {
          950: "#03070e",
          900: "#07111f",
          850: "#0b192c",
          800: "#10223b",
          750: "#152945",
          700: "#183050",
          600: "#22416b",
          500: "#335b91",
          400: "#5580ba",
          300: "#84a6d6",
          200: "#bad0ee",
          100: "#e0eaf6",
          50: "#f0f5fb",
          DEFAULT: "#07111f",
        },
        // Harmonized Slate for Light Mode (Ivory canvas/borders and Deep Atlas Navy text)
        slate: {
          50: "#faf7f0", // Light background ivory
          100: "#f3ede0", // Slightly deeper ivory for chips/inputs
          150: "#ede3d0",
          200: "#e4d8c2", // Ivory borders
          250: "#d7c9ae",
          300: "#c7b597",
          350: "#af9b7b",
          400: "#8b7b62", // Taupe-ivory muted
          500: "#5a6e87", // Atlas navy mid-tone
          600: "#3a4e69", // Deep Atlas navy subtext
          700: "#21344e", // Deep Atlas navy body text
          800: "#13233b", // Deep Atlas navy bold
          850: "#0c182b",
          900: "#071221", // Deep Atlas navy headings
          950: "#040913",
        },

        // DARK MODE PALETTE: Jet-Black, Cerulean Blue, and Neon Rose
        cerulean: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#00a6ed", // Pure vivid Cerulean Blue
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          DEFAULT: "#00a6ed",
          glow: "rgba(0, 166, 237, 0.25)",
        },
        rose: {
          50: "#fff1f4",
          100: "#ffe4e8",
          200: "#fecdd6",
          300: "#fda4b4",
          400: "#fb718b",
          500: "#ff1a75", // Vivid Neon Rose
          600: "#e6005c",
          700: "#be0049",
          800: "#9f073d",
          900: "#830d36",
          DEFAULT: "#ff1a75",
          glow: "rgba(255, 26, 117, 0.25)",
        },
        // Jet-Black Scale for Dark Mode
        dark: {
          950: "#000000", // Pure Jet-Black canvas
          900: "#080808", // Card background Jet-Black
          850: "#0f0f0f", // Elevated card surface
          800: "#181818", // Dark card border stroke
          750: "#1f1f1f",
          700: "#262626", // Dark border hover
          600: "#363636", // Subtle lines
          500: "#52525b",
          400: "#a1a1aa", // Secondary muted text
          300: "#d4d4d8", // Bright secondary text
          200: "#f4f4f5", // High-contrast text
        },

        // Primary: Gold in light mode, dynamically accented with Cerulean in dark mode
        primary: {
          DEFAULT: "#c59828",
          50: "#fdfbf4",
          100: "#f8f3dc",
          200: "#efe4b2",
          300: "#e3cf80",
          400: "#d7ba52",
          500: "#c59828",
          600: "#a97e1a",
          700: "#876212",
          800: "#694b0d",
          900: "#07111f",
        },
        java: {
          DEFAULT: "#f59e0b",
          glow: "rgba(245, 158, 11, 0.2)",
        },
        spring: {
          DEFAULT: "#10b981",
          glow: "rgba(16, 185, 129, 0.2)",
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
          "0%, 100%": { opacity: 0.15, transform: "scale(1)" },
          "50%": { opacity: 0.35, transform: "scale(1.06) translate(10px, -10px)" },
        }
      }
    },
  },
  plugins: [],
}
