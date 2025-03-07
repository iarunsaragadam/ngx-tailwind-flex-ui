/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/playground/src/**/*.{html,ts}",
    "./libs/ngx-tailwind-flex-ui/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  presets: [
    require('../../libs/ngx-tailwind-flex-ui/tailwind.config.js')
  ],
  plugins: [],
}
