/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05060A",
        foreground: "#F5F5F5",
        gold: "#F6C453",
        goldSoft: "#F0B95A",
        accent: "#7C5CFF",
        card: "#0B0C12",
        borderSoft: "#1A1B25",
      },
      boxShadow: {
        "gold-glow": "0 0 30px rgba(246,196,83,0.45)",
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "SF Pro Text", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
