// babel.config.js

module.exports = {
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "createElement" // default pragma is createElement
      }
    ]
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ]
};
