/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "desktop-bg": "url('../public/images/pattern-bg-desktop.jpg')",
        "mobile-bg": "url('../public/images/pattern-bg-mobile.png')",
      },
      colors: {
        dark_grey: "hsl(0, 0%, 17%)",
        light_grey: "hsl(0, 0%, 59%)",
      },
    },
  },
  plugins: [],
};
