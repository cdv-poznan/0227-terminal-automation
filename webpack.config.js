const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      // filename: ''
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
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
  };
};

module.exports = config;
