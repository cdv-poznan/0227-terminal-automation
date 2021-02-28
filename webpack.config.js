const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { readFileSync } = require('fs');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = (env, args) => {
  console.log('env', env);
  console.log('args', args);

  const PRODUCTION = args.mode === 'production';

  return {
    entry: {
      main: ['./src/main', './src/style.scss'],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            PRODUCTION
              ? MiniCssExtractPlugin.loader
              : {
                  loader: 'style-loader',
                },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(svg|eot|woff|woff2|ttf)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/favicon.ico',
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        publicPath: '',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new ESLintWebpackPlugin({
        formatter: 'codeframe',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/service-worker.js',
            to: '',
          },
        ],
      }),
      new WebpackPwaManifest({
        name: 'CDV JavaScript Project',
        short_name: 'cdv',
        start_url: '.',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        display: 'standalone',
        fingerprints: false,
        theme_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/assets/favicon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      new FaviconsWebpackPlugin('./src/assets/favicon.png'),
    ],
    devServer: {
      port: 4200,
      https: true,
      key: readFileSync('./cert/localhost-key.pem'),
      cert: readFileSync('./cert/localhost.pem'),
    },
    devtool: PRODUCTION ? 'source-map' : 'eval-source-map',
  };
};

module.exports = config;
