/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        light: ["var(--font-GroteskLight)"],
        regular: ["var(--font-GroteskRegular)"],
        semibold: ["var(--font-GroteskSemiBold)"],
        bold: ["var(--font-GroteskBold)"],
        condensedBold: ["var(--font-GroteskXCondBold)"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
