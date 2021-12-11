module.exports = {
  content: ["./src/**/*.{html,js,tsx}", './public/**/*.html'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
