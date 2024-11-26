/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "640px", // Por debajo de este tamaño se considera "mobile".
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};

