/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constant/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {

        poppinsThin: ["poppins_thin", "sans-serif"],
        
        poppinsRegular: ["poppins_regular", "sans-serif"],

        poppinsMedium: ["poppins_medium", "sans-serif"],

        poppinsBold: ["poppins_bold", "sans-serif"],

        poppinsSmBold: ["poppins_semi_bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}
