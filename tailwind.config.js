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
        // OBSIDIAN & CHAMPAGNE PREMIUM PALETTE

        // Obsidian Black Scale (Dark theme)
        obsidian: {
          950: "#0A0A0D",
          900: "#101014", // Primary dark background
          850: "#14141A",
          800: "#19191F", // Card background
          750: "#22222A", // Elevated surfaces
          700: "#2A2A33",
          600: "#303038", // Borders & dividers
          DEFAULT: "#101014",
        },

        // Champagne Gold Scale (Primary Accent)
        champagne: {
          50: "#FAF7F2",
          100: "#F4EFE5",
          200: "#E8DEC8",
          300: "#DECBA1",
          400: "#D6B77A", // The Signature Champagne Gold
          500: "#D6B77A",
          600: "#C5A566", // Hover gold
          700: "#A9894A",
          800: "#8A6D33",
          900: "#5E481D",
          DEFAULT: "#D6B77A",
          glow: "rgba(214, 183, 122, 0.22)",
          subtle: "rgba(214, 183, 122, 0.10)",
        },

        // Warm Ivory Scale (Light theme canvas)
        ivory: {
          50: "#FAF8F5",
          100: "#F4F0E8", // Surface card light
          200: "#E8E2D8", // Primary light background
          300: "#DDD5C8",
          400: "#CFC5B4", // Light border
          500: "#B8AC99",
          600: "#8F826F",
          700: "#695D4D",
          800: "#443C30",
          900: "#1F1A13",
          DEFAULT: "#E8E2D8",
        },

        // Graphite Grey (Secondary text and muted UI)
        graphite: {
          100: "#D3D3DC",
          200: "#B8B8C4",
          300: "#9E9EAA",
          400: "#8A8A97",
          500: "#777783", // Signature Graphite Grey
          600: "#60606B",
          700: "#4B4B54",
          800: "#36363E",
          900: "#25252B",
          DEFAULT: "#777783",
        },

        // Primary Accent Mapping (Champagne Gold)
        primary: {
          DEFAULT: "#D6B77A",
          50: "#FAF7F2",
          100: "#F4EFE5",
          200: "#E8DEC8",
          300: "#DECBA1",
          400: "#D6B77A",
          500: "#D6B77A",
          600: "#C5A566",
          700: "#A9894A",
          800: "#8A6D33",
          900: "#5E481D",
          glow: "rgba(214, 183, 122, 0.22)",
        },

        // Dark Scale (Direct mapping to Obsidian Black, Card #19191F, Divider #303038, Text #F7F5F0)
        dark: {
          950: "#101014", // Obsidian Black
          900: "#19191F", // Card background
          850: "#22222A", // Elevated surface
          800: "#303038", // Borders & dividers
          750: "#3C3C46",
          700: "#4E4E59",
          600: "#646470",
          500: "#777783", // Graphite Grey
          400: "#9E9EAA",
          300: "#C8C6C0",
          200: "#E8E5DD",
          100: "#F7F5F0", // Primary text on dark
        },

        // Slate Scale (Direct mapping to Warm Ivory & Light UI tokens)
        slate: {
          50: "#FAF8F5",
          100: "#F4F0E8", // Light card background
          150: "#EDE7DC",
          200: "#E8E2D8", // Warm Ivory base canvas
          250: "#DDD5C8",
          300: "#D0C8BC", // Light border
          350: "#B8AC99",
          400: "#777783", // Graphite Grey
          500: "#60606B",
          600: "#4B4B54",
          700: "#36363E", // Body text on light
          800: "#25252B",
          900: "#19191F", // Deep headings on light
          950: "#101014",
        },

        // Backward compatibility aliases
        gold: {
          500: "#D6B77A",
          600: "#C5A566",
          700: "#A9894A",
          DEFAULT: "#D6B77A",
          light: "#DECBA1",
          glow: "rgba(214, 183, 122, 0.22)",
        },
        neon: {
          400: "#DECBA1",
          500: "#D6B77A",
          600: "#C5A566",
          DEFAULT: "#D6B77A",
          glow: "rgba(214, 183, 122, 0.22)",
          subtle: "rgba(214, 183, 122, 0.10)",
        },
        silver: {
          100: "#F7F5F0",
          200: "#E8E5DD",
          300: "#C8C6C0",
          400: "#9E9EAA",
          500: "#777783",
          DEFAULT: "#F7F5F0",
        },
        charcoal: {
          950: "#101014",
          900: "#19191F",
          850: "#22222A",
          800: "#303038",
          DEFAULT: "#19191F",
        },
        cerulean: {
          400: "#D6B77A",
          500: "#D6B77A",
          DEFAULT: "#D6B77A",
        },
        rose: {
          400: "#D6B77A",
          500: "#D6B77A",
          DEFAULT: "#D6B77A",
        },
        java: {
          DEFAULT: "#D6B77A",
          glow: "rgba(214, 183, 122, 0.2)",
        },
        spring: {
          DEFAULT: "#DECBA1",
          glow: "rgba(222, 203, 161, 0.2)",
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
          "50%": { opacity: 0.24, transform: "scale(1.04) translate(6px, -6px)" },
        }
      }
    },
  },
  plugins: [],
}
