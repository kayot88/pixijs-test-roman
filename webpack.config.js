/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  return {
    stats: 'minimal', 
    entry: './src/index.ts', 

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },

    devServer: {
      compress: true,
      allowedHosts: 'all', 
      static: false,
      client: {
        logging: 'warn',
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
      port: 1234,
      host: '0.0.0.0',
    },

    performance: { hints: false },

    devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,

    optimization: {
      minimize: argv.mode === 'production',
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            compress: { drop_console: true },
            output: { comments: false, beautify: false },
          },
        }),
      ],
    },

    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    experiments: {
      topLevelAwait: true,
    },

    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'assets/' },
          {
            from: 'src/resources',
            to: 'utils',
          },
        ],
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        hash: true,
        minify: false,
      }),
    ],
  };
};
