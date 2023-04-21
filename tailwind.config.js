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
        "secondary-context": "#7A7886",
        dashboard: "#fafcff",
        dark: "#3A3D42",
        error: "#FF5B37",
        income: "#1EC15F",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "first-content": "url('/img/bg-main.svg')",
        auth: "url('/img/bg-auth.svg')",
      },
      boxShadow: {
        "card-md": "0px 4px 20px 0px #0000000D",
        "card-lg": "0px 4px 20px 0px #BBBBBB40",
      },
    },
  },
  plugins: [require("daisyui")],
};
