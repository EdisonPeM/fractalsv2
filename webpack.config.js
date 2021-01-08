const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'],
  },
};

const config = {
  output: {
    filename: 'js/[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@View': path.resolve(__dirname, 'src', 'view'),
      '@Controller': path.resolve(__dirname, 'src', 'controller'),
      '@Model': path.resolve(__dirname, 'src', 'model'),
      '@Constants': path.resolve(__dirname, 'src', 'constants'),
    },
  },
  module: {
    rules: [
      {
        test: /\.?worker\.ts$/,
        use: ['ts-loader', 'worker-loader'],
      },
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: '/node_modules/',
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[contenthash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, 'public') }],
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'eval-source-map';
    config.devServer = {
      host: '0.0.0.0',
      port: 3000,
      hot: true,
      historyApiFallback: {
        disableDotRule: true,
      },
    };
  }

  return config;
};
