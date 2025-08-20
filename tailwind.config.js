module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          300: "#7C91A7",
          400: "#597393",
          500: "#395375",
          600: "#243B5A",
          700: "#152940",
          800: "#0D1928",
          900: "#05101A"
        }
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(to bottom right, #05101A, #243B5A, #7C91A7)"
      }
    }
  },
  plugins: [],
}
