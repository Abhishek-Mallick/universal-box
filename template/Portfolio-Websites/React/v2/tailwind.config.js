// /** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  content: [
    // "./src/**/*.{js,jsx,ts,tsx}",
    "src/components/Aboutme.jsx",
     "src\\components\\Bento.jsx", 
     "./projectSlider.html"
    //  "public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        customTeal: '#3e9392',
      },
    },
  },
  plugins: [],
}
