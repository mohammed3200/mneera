module.exports = {
  plugins: {
    tailwindcss: {
      // this path is wrong—PostCSS is already running _inside_ renderer/
      config: './renderer/tailwind.config.js',
    },
    autoprefixer: {},
  },
}
