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
        // Deep Atlas Navy Palette
        dark: {
          950: "#050b14", // Deepest Atlas Navy background
          900: "#091322", // Card background Atlas Navy
          850: "#0e1c31", // Elevated surface Atlas Navy
          800: "#142540", // Card border & highlight stroke
          750: "#182c4b", // Border hover
          700: "#1e3557", // Active border stroke
          600: "#2b4670", // Subtle line stroke
          500: "#496894", // Muted Atlas Navy
          400: "#8fa9cc", // Secondary text / soft Atlas slate
          300: "#c4d5ea", // Bright secondary text
          200: "#f6f3eb", // Main Ivory text in dark mode
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
        // Refined Warm Ivory Palette
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
        // Warm Regal Gold Palette
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
        // Primary alias to Gold for instant global consistency
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
        // Harmonized Slate replacement to blend all slate classes into Ivory & Atlas Navy
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
        java: {
          DEFAULT: "#d97706", // Warm amber
          glow: "rgba(217, 119, 6, 0.18)",
        },
        spring: {
          DEFAULT: "#059669", // Emerald
          glow: "rgba(5, 150, 105, 0.18)",
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
          "0%, 100%": { opacity: 0.12, transform: "scale(1)" },
          "50%": { opacity: 0.25, transform: "scale(1.05) translate(10px, -10px)" },
        }
      }
    },
  },
  plugins: [],
}
