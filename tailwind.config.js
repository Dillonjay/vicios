/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Aileron", "sans-serif"],
        fontWeight: {
          light: 300,
          regular: 400,
          bold: 800,
          black: 900,
        },
      },
      colors: {
        blackOverlay: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
