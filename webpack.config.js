const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

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
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [['optipng', { optimizationLevel: 5 }]],
      },
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = (env, argv) => {
  config.mode = argv.mode;
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
