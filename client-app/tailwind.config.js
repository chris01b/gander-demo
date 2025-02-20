/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: {
      'aviation-blue': '#1e3a8a',
      'urgency-emergency': '#dc2626'
    }
  } },
  plugins: [],
}

