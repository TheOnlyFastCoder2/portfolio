/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    screens: {
      'sm': {'max':'500px'},
      'min-sm': {'min':'500px'},

      'md': {'max':'700px'},
      'min-md': {'min':'700px'},
      
      'lg': {'max':'1024px'},
      'min-lg': {'min':'1024px'},
      
      'xl': {'min':'1280px'},
      '2xl': {'min':'1536px'},
    },
    
    extend: {
      padding: {
        '36':'clamp(12px,3vw,56px)'
      },
      margin: {
        '36':'clamp(12px,3vw,56px)'
      },

      colors: {
        "decor": "#1abc9c",
        "black": "#404042",
        "dark": "#737374",
        "white": "#ffffff",
        "background": '#EEEDF8',
      }
    },
  },
  plugins: [],
}

