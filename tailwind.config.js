/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#705731",
        secondary: "#7c572d",
        accent:    "#6B8E5F",
        surface:   "#fff8f6",
        muted:     "#4e453b",
        text:      "#2a170f",
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body:    ['"Source Sans 3"',    "sans-serif"],
      },
      borderRadius: {
        brand: "8px",
        btn:   "4px",
        input: "4px",
      },
      boxShadow: {
        brand: "none",
        card:  "0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.04)",
        hover: "0 4px 12px rgba(0,0,0,0.10), 0 20px 48px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "page-fade":     "pageFade 0.4s ease both",
        "slide-in-right":"slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) both",
        "shimmer":       "shimmer 1.5s infinite",
      },
      keyframes: {
        pageFade: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(60px)" },
          to:   { opacity: "1", transform: "translateX(0)"    },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
    },
  },
  plugins: [],
};