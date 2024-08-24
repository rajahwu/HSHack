#!/bin/bash

# Get directory name from argument, default to "app" if not provided
project_dir=${1:-app}

# Check if .babelrc already exists in the specified directory
if [ -f "$project_dir/webpack.config.js" ]; then
    echo "Error: .webpack.config.js already exists in '$project_dir'. Please delete it or choose a different filename." >&2
    exit 1
fi

# Change to the specified directory
cd "$project_dir" || {
    echo "Error: Failed to enter directory '$project_dir'" >&2
    exit 1
}

# Create .babelrc with the specified content
cat << EOF > webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new Dotenv({
      path: './.env',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' },
        { from: 'public/favicon.ico', to: 'favicon.ico' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
EOF

cat webpack.config.js

echo "webpack.config.js created successfully in '$project_dir'!"