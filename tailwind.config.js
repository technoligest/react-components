module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './showcase/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Ubuntu'],
      serif: ['Ubuntu'],
      mono: ['Ubuntu'],
    },
    extend: {
      boxShadow: {
        base: 'rgb(205 205 205) 0px 1px 20px 0px',
        dark: 'none',
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
    },
  },
  plugins: [],
};
