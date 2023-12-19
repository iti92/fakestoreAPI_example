/* eslint-disable */

import * as path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyPlugin from 'copy-webpack-plugin';

const currentMode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config: Configuration = {
  entry: {
    index: './src/index.ts',
    serviceWorker: './src/utils/serviceWorker.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
  },
  devtool: 'cheap-module-source-map',
  mode: currentMode,
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/404.html',
      filename: '404.html',
      chunks: ['404'],
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }),
  ],
};

export default config;

