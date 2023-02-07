/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        spartan: ['League Spartan', 'sans-serif'],
      },
      colors: {
        danger: "#E95444",
      },
      backgroundImage: {
        Hero: "url('Assets/Images/Hero1.jpg')",
      },
    },
  },
  plugins: [],
}
