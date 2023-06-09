/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/*.{vue,js,ts,jsx,tsx}",
    "./src/views/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sss':'360px',
      'ss':'480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    }
  },
  extend: {},

  plugins: [],
}
