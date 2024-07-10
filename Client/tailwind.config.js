export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1f2937", // Dark Gray for headers and primary buttons
        secondary: "#4b5563", // Medium Gray for secondary buttons
        accent: "#3b82f6", // Blue for accents and links
        background: "#f9fafb", // Light Gray for background
        text: "#111827", // Almost Black for text
        border: "#e5e7eb", // Light Gray for borders
      },
    },
  },
  plugins: [],
};
