const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, 'client/src');
const distDir = path.resolve(__dirname, 'client/dist');

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  stats: {
    excludeModules: /node_modules/,
  },
  entry: {
    app: path.resolve(srcDir, 'index.jsx'),
  },
  output: {
    path: distDir,
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
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
            plugins: [
              '@babel/transform-runtime'
            ]
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 80
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.join(__dirname, 'client/src', 'index.html')})
  ],

};
