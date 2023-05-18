const path = require('path');

module.exports = {
  mode : 'production',
  entry: './src/scripts/index.js', // Replace with the path to your main JavaScript file
  output: {
    path: path.resolve(__dirname, './gwybodaeth/scripts'), // Replace with the desired output directory for your bundled JavaScript
    filename: 'bundle.js',
  },
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
    modules: ['node_modules', 'src/scripts'], // Add the relevant directories where your modules are located
  }

  
};

