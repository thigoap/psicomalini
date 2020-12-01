module.exports = {
  purge: {
    enabled: true,
    content: ['./src/site/**/*.njk'],
  },
  theme: {
    fontFamily: {
      sans: ['"Maven Pro"', 'sans-serif'],
      header: ['"Baloo 2"', 'cursive'],
      prata: ['Prata', 'serif']
    },
    extend: {
      colors: {
        'primarytext': '#a17670',
        'primarybg': '#fbe7e0',
        'mainbg': '#fffaf9',
        'faceicon': '#4267b2',
        'instaicon': '#833AB4',
        'whatsicon':'#4fce5d'
      }
    },
  },
  variants: {},
}