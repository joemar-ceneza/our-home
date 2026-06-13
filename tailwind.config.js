/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      colors: {
        sand: "#FAF6F0", // page background
        cream: "#FFFDFB", // card / raised surfaces
        ink: "#2B2622", // primary text
        muted: "#6B6259", // secondary text
        clay: {
          DEFAULT: "#B5613E", // accent / primary actions
          dark: "#9A4F30", // accent hover
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(43, 38, 34, 0.08)",
      },
    },
  },
  plugins: [],
};
