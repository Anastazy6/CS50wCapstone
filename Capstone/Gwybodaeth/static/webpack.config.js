const path = require('path');

console.log(path.resolve(__dirname, '.'))

module.exports = {
  mode : 'development',
  entry: './gwybodaeth/scripts/index.js', // Replace with the path to your main JavaScript file
  output: {
    path: path.resolve(__dirname, './gwybodaeth/scripts'), // Replace with the desired output directory for your bundled JavaScript
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'scripts'), 'node_modules'], // Add the relevant directories where your modules are located
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  
};

