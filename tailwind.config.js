/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        background: "#1E1E2D",
        foreground: "#d4c8f9",
        card: "#383945",
        cardForeground: "#d4c8f9",
        popover: "#383945",
        popoverForeground: "#d4c8f9",
        primary: "#3b82f6",
        primaryForeground: "#b47a2d",
        secondary: "#b47a2d",
        secondaryForeground: "#d4c8f9",
        muted: "#b47a2d",
        mutedForeground: "#cc53a6",
        accent: "#b47a2d",
        accentForeground: "#d4c8f9",
        destructive: "#004d4e",
        destructiveForeground: "#d4c8f9",
        border: "#b47a2d",
        input: "#b47a2d",
        ring: "#e3c1cc",
      },
    },
  },
  plugins: [],
};

// colors: {
//   primary: "#161622",
//   background: "#102145",
//   card: "rgba(100,50,50,0.5)",
//   secondary: {
//     DEFAULT: "#FF9C01",
//     100: "#FF9001",
//     200: "#FF8E01",
//   },
//   black: {
//     DEFAULT: "#000",
//     100: "#1E1E2D",
//     200: "#232533",
//   },
//   gray: {
//     100: "#CDCDE0",
//   },
// },
