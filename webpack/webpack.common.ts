/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from 'webpack';
import DotenvPlugin from 'dotenv-webpack';
import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';
import path from 'path';
import EslintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import type { FileDescriptor } from 'webpack-manifest-plugin/dist/helpers';
import rules from './webpack.rules';
import baseManifest from '../src/assets/base_manifest.json';

const config: Configuration = {
  entry: {
    index: path.resolve(__dirname, '..', 'src', 'index'),
    background: path.resolve(__dirname, '..', 'src', 'scripts', 'background'),
    authcheck: path.resolve(__dirname, '..', 'src', 'scripts', 'authcheck'),
  },
  experiments: {
    asyncWebAssembly: true,
  },
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules,
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, '..', 'fac'),
      outDir: path.resolve(__dirname, '..', 'pkg-fac'),
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, '..', 'env'),
      outDir: path.resolve(__dirname, '..', 'pkg-env'),
    }),
    new EslintPlugin({ eslintPath: require.resolve('eslint') }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src', 'template.html'),
      minify: true,
      inject: true,
      chunks: ['index'],
    }),
    new DotenvPlugin({
      path: path.resolve(__dirname, '..', '.env'),
    }) as never,
    new WebpackManifestPlugin({
      generate: (_seed, files) => {
        const {
          version,
          description,
          displayName,
          // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
        } = require('../package.json');

        const newFiles = files.map((file) => ({
          ...file,
          path: file.path.replace('auto', ''),
        }));

        const backgroundJs = newFiles.find(
          ({ name }) => name === 'background.js',
        ) as FileDescriptor;
        const authcheckJs = newFiles.find(
          ({ name }) => name === 'authcheck.js',
        ) as FileDescriptor;

        baseManifest.background.scripts[0] = backgroundJs.path;
        baseManifest.content_scripts[0].js[0] = authcheckJs.path;
        baseManifest.description = description;
        baseManifest.name = displayName;
        baseManifest.version = version;

        return { ...baseManifest };
      },
    }),
  ],
};

export default config;
