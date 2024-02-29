/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      laila: ["Laila", "sans-serif"],
      comfortaa: ["Comfortaa", "sans-serif"],
    },
    container: {
      padding: "1rem",
      screens: {
        tn: "100%",
        sm: "100%",
        md: "768px",
        lg: "768px",
        xl: "768px",
        "2xl": "768px",
        "3xl": "768px",
      },
    },
    screens: {
      tn: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "2000px",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
