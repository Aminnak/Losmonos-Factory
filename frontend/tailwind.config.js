/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}", // Include Angular templates and components
    ],
    theme: {
      extend: {},
    },
    plugins: [require("tailwind-scrollbar")],
    variants: {
      scrollbar: ["hidden"], // Enable the hidden variant
    },
  };
