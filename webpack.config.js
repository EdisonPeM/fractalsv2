const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const WebpackPwaManifestPlugin = require('webpack-pwa-manifest');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const isDevelop = argv.mode === 'development';

  return {
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
        '@InitialValues': path.resolve(__dirname, 'src', 'initialValues'),
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
          use: [
            isDevelop ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
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
      new WebpackPwaManifestPlugin({
        name: 'Fractals',
        shortname: 'Mandelbrot & Julia Fractals',
        description:
          'Aplicación para generar fractales del conjunto de Mandelbrot y Julia',
        background_color: '#c9f7f7',
        theme_color: '#c9f7f7',
        ios: {
          'apple-mobile-web-app-title': 'AppTitle',
          'apple-mobile-web-app-status-bar-style': 'black-translucent',
        },
        icons: [
          {
            src: path.resolve(__dirname, 'public/favicon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
            ios: true,
          },
          {
            src: path.resolve(__dirname, 'public/maskable_icon.png'),
            size: [512, 1024],
            destination: path.join('icons'),
            ios: 'startup',
          },
          {
            src: path.resolve(__dirname, 'public/maskable_icon.png'),
            size: [512, 1024],
            destination: path.join('icons'),
            purpose: 'maskable',
          },
        ],
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [['optipng', { optimizationLevel: 5 }]],
        },
      }),
      !isDevelop && new WorkboxWebpackPlugin.GenerateSW(),
    ].filter(Boolean),
    devtool: isDevelop ? 'eval' : 'source-map',
    optimization: {
      usedExports: !isDevelop,
      minimize: !isDevelop,
      minimizer: isDevelop ? [] : [new TerserPlugin()],
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
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      hot: true,
      historyApiFallback: {
        disableDotRule: true,
      },
    },
  };
};
