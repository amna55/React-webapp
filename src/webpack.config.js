const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // Add this line to specify that JavaScript files can be imported without extension
    alias: {
      // Add aliases for the problematic imports in shpjs
      './binaryajax-browser': path.resolve(__dirname, 'node_modules', 'shpjs', 'lib', 'binaryajax-browser.js'),
      './combine': path.resolve(__dirname, 'node_modules', 'shpjs', 'lib', 'combine.js'),
    },
  },
};
