/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // if using public/index.html
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Make sure this includes all relevant folders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
