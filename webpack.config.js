const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: ['@babel/polyfill', './src/index.jsx'],
    sw: './src/sw.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dst'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  require('postcss-flexbugs-fixes'),
                  require('precss'),
                  require('autoprefixer'),
                ];
              },
            },
          },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/_variables.scss'],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.ejs',
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '/dst'),
    compress: true,
    port: 8080,
  },
};
