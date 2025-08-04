/** @type {import('tailwindcss').Config} */
module.exports = {
  content:[
  "./public/index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow:'var(--yellow)',
        lightYellow:'var(--light-yellow)',
        
        darkBlack:'var(--black-dark)',
        lightBlack:'var(black-light)',
        darkGray:'var(--gray-dark)',
        gray:'var(--gray)',
        normalGray:'var(--gray-normal)',
        lightGray:'var(--gray-light)',

        navy:'var(--navy)',
        darkNavy:'var(--navy-dark)',
        lightNavy:'var(--navy-light)',
        pastelNavy:'var(--navy-pastel)',

        red:'var(--red)',
        darkRed:'var(--red-dark)',
        lightRed:'var(--red-light)',
        
        green:'var(--green)',
        darkGreen:'var(--green-dark)',
        lightGreen:'var(--green-light)'
      },
    },
  },
  plugins: [],
}

