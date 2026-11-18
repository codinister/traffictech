/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071a3c",
        ink: "#101e4c",
        brand: "#1260f5",
        mist: "#f2f6ff"
      },
      boxShadow: {
        panel: "0 5px 20px rgba(30, 68, 140, .07)"
      }
    }
  },
  plugins: []
};
