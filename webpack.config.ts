import { resolve } from 'path';

import { Configuration } from 'webpack';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';

import pkg from './package.json';


/* --------
 * Project Paths
 * -------- */
export const projectDir = (...args: string[]) => resolve(__dirname, ...args);

export const sourceDir = (...args: string[]) => projectDir('src', ...args);

export const destDir = (...args: string[]) => projectDir('dist', ...args);

export const nodeModules = (...args: string[]) => projectDir('node_modules', ...args);


const externals: (string | RegExp)[] = [];

Object
  .keys(pkg.peerDependencies)
  .concat(Object.keys(pkg.dependencies))
  .map(dep => ([ dep, new RegExp(`^${dep}\/.+$`) ]))
  .forEach(([ str, regexp ]) => {
    externals.push(str, regexp);
  });


/* --------
 * Define the WebPack Configuration
 * to correctly build React Bucket UI
 * -------- */
export default {

  // Set main webpack context to source root directory
  context: sourceDir('react'),

  // Set webpack mode based on NODE_ENV
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

  // Set devTools to source map
  devtool: 'source-map',

  // Set bundle target to web
  target: 'web',

  // Set main project entry points
  entry: {
    // All React Bucket Components
    all : 'index.ts',
    // Only React Bucket Grid System
    grid: 'grid.ts'
  },

  // Set main project output configuration
  output: {
    // Path to place bundle
    path         : destDir(),
    // Set the filename
    filename     : '[name].js',
    // Set the library name
    library      : '',
    // Set the library target
    libraryTarget: 'commonjs',
    // Set the public path
    publicPath   : '/dist/'
  },

  // Set the module resolution options
  resolve: {
    // Set modules path
    modules   : [ sourceDir('react'), nodeModules() ],
    // Module extension to look for
    extensions: [ '.js', '.jsx', '.ts', '.tsx', '.json' ],
    // Set React Alias
    alias     : {
      react      : nodeModules('react'),
      'react-dom': nodeModules('react-dom'),
      lodash     : nodeModules('lodash'),
      clsx       : nodeModules('clsx'),
      assets     : destDir('assets')
    }
  },

  // Remove some node library
  node: {
    fs           : 'empty',
    child_process: 'empty',
    net          : 'empty',
    tls          : 'empty',
    dns          : 'empty'
  },

  // Don't include react into bundle
  externals,

  // Configure Rules
  module: {
    rules: [

      // TS Rules
      {
        test  : /\.tsx?$/,
        loader: 'ts-loader'
      },

      // Use Extract Text Plugin to get and compile Style
      {
        test   : /\.scss$/,
        exclude: /node_modules/,
        use    : [
          // MiniCSS Extractor loader
          MiniCSSExtractPlugin.loader,

          // Analyze and Load the CSS
          {
            loader : 'css-loader',
            options: {
              modules      : false,
              importLoaders: 2,
              sourceMap    : true
            }
          },

          // Use PostCSS Loader
          'postcss-loader',

          // Compile SCSS
          {
            loader : 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      // Assets Loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        use : [
          {
            loader : 'url-loader',
            options: {
              fallback  : 'file-loader',
              name      : '[name][md5:hash].[ext]',
              outputPath: 'assets/',
              publicPath: '/assets/'
            }
          }
        ]
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use : 'file-loader'
      }

    ]
  },

  // Append Plugins
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].css'
    })
  ]

} as Configuration;
