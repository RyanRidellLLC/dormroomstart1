// Add this or update your colors section in your Tailwind config
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: {
          100: "#e5eaf4",
          200: "#c5cfe8",
          300: "#a4b4db",
          400: "#7087c7",
          500: "#223262",
          600: "#19264c",
          700: "#14213d",
        },
      },
      backgroundImage: {
        "navy-gradient":
          "linear-gradient(135deg, #14213d 0%, #223262 60%, #7087c7 100%)",
      },
    },
  },
  // ...rest of your config
};
