import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purpleLight: "#B1A4D2",
        purpleMedium: "#3D374C",
        purpleDark: "#2C2835",
        greenMedium: "#B8FA7D",
        redMedium: "#FA7D7F",
        grayMedium: "#B3B3B3",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
