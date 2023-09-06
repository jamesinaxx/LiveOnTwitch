/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');

const srcDir = path.join(__dirname, '..', 'src');

module.exports = {
  entry: {
    popup: path.join(srcDir, 'index.tsx'),
    // options: path.join(srcDir, 'options.tsx'),
    background: path.join(srcDir, 'scripts', 'background.ts'),
    content_script: path.join(srcDir, 'scripts', 'authCheck.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background';
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [{ from: '.', to: '../', context: 'public' }],
    //   options: {},
    // }),
  ],
};
