module.exports = {
  darkMode: 'class',
  content: [
    '../Server/Web/public/views/**/*.html',
    '../Server/Web/public/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};