/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "desktop-bg": "url('../public/images/pattern-bg-desktop.jpg')",
        "mobile-bg": "url('../public/images/pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [],
};
