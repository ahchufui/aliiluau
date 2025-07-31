/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'maroon': '#8C0920', // Queensland Government maroon color (Pantone 207C)
        'teal': {
          DEFAULT: '#00A9CE',
          '50': '#E6F9FF',
          '100': '#CCF3FF',
          '200': '#99E7FF',
          '300': '#66DBFF',
          '400': '#33CFFF',
          '500': '#00C3FF',
          '600': '#00A9CE',
          '700': '#007A9B',
          '800': '#005268',
          '900': '#002935',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'footer-pattern': "url('/images/footer-bg.jpg')",
      },
    },
  },
  plugins: [],
}
