const { DEFAULT_DEPRECATION_REASON } = require('graphql');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    // container: {
    //   center: true,
    //   padding: "2rem",
    //   screens: {
    //     "2xl": "1400px",
    //   },
    // },
    extend: {
      screens: {
        '4k': '1920px', 
        },
      maxWidth: {
        'container': '85%',
			'container2': '1620px',
      },
      colors: {
        'primary': '#171717',
        'secondary': '#D2FF3A',
        'brand': '#28282A',
      },
      backgroundImage:{
        'evoked': 'url(/assets/evoked.png)',
        'hero': 'url(/assets/hero.svg)',
        'banner': 'url(/assets/bannerMobile.png)',
        'collection': 'url(/assets/collectionRect.png)',
        'collectionImage': 'url(/assets/collectionListImage.png)',
        'preSelling': 'url(/assets/preselling.png)',
        'gradient-text': 'linear-gradient(90deg, #EDCF5D 0%, #975000 42.84%)',
      },
      navcontainer: {
          center: true,
          padding: {
            DEFAULT: "1rem",
            sm:  "2rem",
            lg: "4rem",
            xl: "5rem",
            "2xl": "6rem"

          }
      }
   
    },
  },
  plugins: [],
}