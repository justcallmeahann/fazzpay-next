/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6379F4",
        "primary-focus": "#4257B2",
        "primary-context": "#EFEFEF",
        secondary: "#FFFFFF",
        dark: "#3A3D42",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "first-content": "url('/img/bg-main.svg')",
      },
      boxShadow: {
        "card-md": "0px 4px 20px 0px #0000000D",
      },
    },
  },
  plugins: [require("daisyui")],
};
