const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.js', // if you unuse typescript entry
  // entry: './src/index.ts',
  output: {
    filename: 'src/[name].[fullhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-object-rest-spread']
          }
        }
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'file-loader',
            options: {}
        }]
      }, {
        test: /\.(png|jpg|gif|webp)$/,
        use: {
          loader: 'url-loader'
        }
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      { test: /\.ts$/, use: 'ts-loader' }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 9090,
    open: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Access-Control-Allow-Credentials": true
    },
    client: {
      logging: 'info',
      overlay: true,
      progress: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'body',
      hash: true
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      exclude: 'node_modules',
      files: './src/'
    })
  ]
};
