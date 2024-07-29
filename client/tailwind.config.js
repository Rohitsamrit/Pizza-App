/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      animation: {
        "fade-in-down": "fadeInDown 0.5s ease-out",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      scale: {
        102: "1.02",
      },
    },
  },
  variants: {
    extend: {
      scale: ["hover"],
    },
  },
  plugins: [],
};
