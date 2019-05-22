const path = require('path');

module.exports = {
  entry: './src/app.js',//archivo ejecutable principal
  output: {
    filename: 'bundle.js',//archivo donde se va a guardar todo el codigo
    path: path.join(__dirname, '/')//ruta donde se guardara el bundle.js
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};