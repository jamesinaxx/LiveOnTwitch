import path from 'path';

export default [
  {
    test: /\.m?[jt]sx?$/,
    include: path.resolve(__dirname, '..', 'src'),
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx',
      target: 'es2015',
    },
  },
];
