const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: ['@babel/polyfill', './src/index.js'],
    sw: './src/sw.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dst'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.ejs',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '/dst'),
    compress: true,
    port: 8080,
  },
};
