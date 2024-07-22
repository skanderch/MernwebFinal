/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
    colors:{
      primary:'#BD00FF',
    },
  },
},
  plugins: [],
  corePlugins:{
    preflight: false,
  },
}