import { defineConfig } from "tailwindcss";

export default defineConfig({
  darkMode: "class", // Enables dark mode
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Define which files Tailwind should scan
});
