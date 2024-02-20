/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.html`],
  daisyui: {
    themes: ['cupcake'],
  },
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

