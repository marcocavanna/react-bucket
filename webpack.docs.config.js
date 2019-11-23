/* eslint-disable import/no-extraneous-dependencies */
const CleanWebPackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const Webpack = require('webpack');

const { isObject } = require('@appbuckets/rabbit');

const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const CONSTANT = {


  /**
   * @name APP_NAME
   * @type {String}
   *
   * @description
   * The name of the project
   */
  APP_NAME: 'ReactBucket | Docs',


  /**
   * @name JS_TEST
   * @type {RegExp}
   *
   * @description
   * Default Javascript RegExp
   * tester variable
   */
  JS_TEST: /\.m?jsx?$/,


  /**
   * @name JS_EXCLUDE
   * @type {RegExp}
   *
   * @description
   * Default exclusion RegExp for
   * Javascript Rules
   */
  JS_EXCLUDE: /node_modules|bower_components/,


  /**
   * @name HTML_TEST
   * @type {RegExp}
   *
   * @description
   * Default HTML Test RegExp
   */
  HTML_TEST: /\.html?$/,


  /**
   * @name SCSS_TEST
   * @type {RegExp}
   *
   * @description
   * Default CSS Test RegExp
   */
  SCSS_TEST: /\.scss$/,


  /**
   * @name  LESS_TEST
   * @type {RegExp}
   *
   * @description
   * Default CSS Test RegExp
   */
  LESS_TEST: /\.less$/,


  /**
   * @name CSS_TEST
   * @type {RegExp}
   *
   * @description
   * Default CSS Test RegExp
   */
  CSS_TEST: /\.css$/,


  /**
   * @name SVG_TEST
   * @type {RegExp}
   */
  SVG_TEST: /\.svg$/,


  /**
   * @name FILENAME_DEV
   * @type {String}
   *
   * @description
   * Filename to use in Dev Mode
   */
  FILENAME_DEV: 'app/[name].bundle.js',


  /**
   * @name FILENAME_PROD
   * @type {String}
   *
   * @description
   * Filename to use in Prod Mode
   */
  FILENAME_PROD: 'app/[contenthash:8].bundle.js',


  /**
   * @name CHUNK_FILENAME_DEV
   * @type {String}
   *
   * @description
   * Chunk Filename to use in Dev Mode
   */
  CHUNK_FILENAME_DEV: 'app/[name].chunk.js',


  /**
   * @name CHUNK_FILENAME_PROD
   * @type {String}
   *
   * @description
   * Chunk Filename to use in Prod Mode
   */
  CHUNK_FILENAME_PROD: 'app/[chunkhash:8].[contenthash:8].chunk.js',


  /**
   * @name INDEX_META_TAG
   * @type {Object}
   *
   * @description
   * Set Meta Tag to Inject into Index file
   */
  INDEX_META_TAG: {
    /**
     * @name charset
     */
    charset: {
      charset: 'UTF-8'
    },

    /**
     * @name httpEquiv
     */
    httpEquiv: {
      'http-equiv'  : 'X-UA-Compatible',
      content       : 'ie=edge'
    },

    /**
     * @name viewport
     */
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',

    /**
     * @name author
     */
    author: 'AppBuckets',

    /**
     * @name copyright
     */
    copyright: `AppBuckets - ${new Date().getFullYear()}`,

    /**
     * @name robots
     */
    robots: 'nofollow',

    /**
     * @name keywords
     */
    keywords: 'React, CSS, Framework',

    /**
     * @name description
     */
    description: 'UI Framework for React App',

    /**
     * @name application-name
     */
    'application-name': 'ReactBucket',

    /**
     * @name apple-mobile-web-app-title
     */
    'apple-mobile-web-app-title': 'ReactBucket',

    /**
     * @name apple-mobile-web-app-capable
     */
    'apple-mobile-web-app-capable': 'yes',

    /**
     * @name apple-mobile-web-app-status-bar-style
     */
    'apple-mobile-web-app-status-bar-style': 'black'
  }

};

module.exports = {

  /**
   * @name context
   * @type {String}
   *
   * @description
   * The absolute path to use to load source
   * Change the base location of all source path
   */
  context: path.resolve(__dirname, 'docs'),


  /**
   * @name entry
   * @type {String|String[]|Object|Function|Promise}
   *
   * @description
   * Define App Entry Point. Each entry point
   * will produce a webpack separate bundle.
   * Using a String is the same
   * that use { main: '.../file.js' }
   *
   * @example
   *  {
   *    app: './src/app/index.js',
   *    extension: './src/extension/index.js',
   *    ...
   *  }
   */
  entry: {
    app: 'index.js'
  },


  /**
   * @name output
   * @type {Object}
   *
   * @description
   * Tell Webpack were to put the bundle file.
   * With multiple entry point, filename must be
   * declared using substitution (eg. [name].js)
   */
  output: {
    /**
     * @name path
     *
     * @description
     * Main path to place file
     * Change base location of all destination path
     */
    path: path.resolve(__dirname, 'public'),

    /**
     * @name filename
     * @type {String}
     *
     * @description
     * Set Bundle Filename
     */
    filename: isProduction ? CONSTANT.FILENAME_PROD : CONSTANT.FILENAME_DEV,

    /**
     * @name chunkFilename
     * @type {String}
     *
     * @description
     * Set Chunk Filename
     */
    chunkFilename: isProduction ? CONSTANT.CHUNK_FILENAME_PROD : CONSTANT.CHUNK_FILENAME_DEV

  },


  /**
   * @name mode
   * @type {String}
   *
   * @description
   * Set Webpack mode
   * could be
   *  - 'none'        : Remove any optimization
   *  - 'development' : Set development on NODE_ENV
   *  - 'production'  : Set production on NODE_ENV and enable minification
   */
  mode: process.env.NODE_ENV,


  ...(!isProduction ? {
    /**
     * @name stats
     * @type {String|Object}
     *
     * @description
     * Set Stats to show error only
     */
    stats: 'normal',


    /**
     * @name performance
     * @type {Object}
     *
     * @description
     * Set performarce warnings and logs
     */
    performance: {

      /**
       * @name hints
       * @type {Boolean|String}
       *
       * @description
       * Set hints type
       */
      hints: 'warning'

    },

    /** Set Dev Tool */
    devtool: 'source-map'
  } : {}),


  /**
   * Set Dev Server Options
   */
  devServer: {
    inline             : true,
    https              : true,
    host               : '127.0.0.1',
    overlay            : true,
    publicPath         : '/',
    historyApiFallback : true
  },


  /**
   * @name resolve
   * @type {Object}
   *
   * @description
   * Path Resolver
   */
  resolve: {

    modules: [
      path.resolve(__dirname, 'docs'),
      path.resolve(__dirname, 'node_modules'),
      'node-modules'
    ]

  },


  /** Set Up Module Optimization */
  optimization: {
    /** Divide Runtime Chunk */
    runtimeChunk: {
      name: entryPoint => `runtime-${entryPoint.name}`
    },

    splitChunks: {
      /** Include all type of Chunks */
      chunks              : 'all',
      /** Maximum number of parallel requests at an entry point. */
      maxInitialRequests  : Infinity,
      minSize             : 0,
      cacheGroups         : {
        vendor: {
          test: /[\\/]node_modules[\\/]/,

          /**
           * This lines of code will divide each node_modules into
           * different file
           */
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          }

        }
      }
    }
  },


  /**
   * @name plugins
   * @type {Object[]}
   *
   * @description
   * An array of webpack plugin that
   * could be used while compiling
   */
  plugins: [

    /**
     * Clean output path
     */
    new CleanWebPackPlugin.CleanWebpackPlugin(),

    /**
     * Auto Inject Bundle file into Index
     */
    new HtmlWebPackPlugin({
      title              : 'InkFlow',
      template           : path.resolve(__dirname, 'docs', 'index.ejs'),
      filename           : './index.html',
      meta               : CONSTANT.INDEX_META_TAG,
      base               : '/'
    }),

    /**
     * Extract CSS file
     */
    new MiniCssExtractPlugin({
      filename       : 'assets/style/[name].bundle.css',
      chunkFilename  : 'assets/style/[contenthash].bundle.css'
    }),

    /**
     * Detect Circular Dependecy
     */
    new CircularDependencyPlugin({
      exclude     : /node_modules/,
      failOnError : true,
      cwd         : process.cwd()
    }),

    /**
     * Set NODE_ENV variable
     */
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })

  ],


  /**
   * @name module
   * @type {Object}
   *
   * @description
   * Define the Module compiling options
   */
  module: {

    /**
     * @name rules
     * @type {Object[]}
     *
     * @description
     * Rules to use
     */
    rules: [

      ...(!isProduction
        /** Use eslint Loader to Show error */
        ? [{
          test     : CONSTANT.JS_TEST,
          exclude  : CONSTANT.JS_EXCLUDE,
          enforce  : 'pre',
          loader   : 'eslint-loader',
          options  : {
            emitWarning: true
          }
        }] : []),

      /** Transpile JS */
      {
        /**
         * @name test
         * @type {RegExp}
         *
         * @description
         * Set the rule testing for Javascript file
         */
        test: CONSTANT.JS_TEST,


        /**
         * @name exclude
         * @type {RegExp}
         *
         * @description
         * Set the rule to exclude files from this rule
         */
        exclude: CONSTANT.JS_EXCLUDE,


        /**
         * @name use
         * @type {String[]|Object|Object[]}
         *
         * @description
         * Set Loader and Options
         */
        use: ['babel-loader']
      },

      /** HTML File Loader */
      {
        /**
         * @name test
         * @type {RegExp}
         *
         * @description
         * Set the rule testing for HTML file
         */
        test: CONSTANT.HTML_TEST,


        /**
         * @name use
         * @type {String[]|Object|Object[]}
         *
         * @description
         * Set Loader and Options
         */
        use: {
          loader   : 'html-loader',
          options  : {
            /**
             * @name minimize
             * @type {Boolean}
             *
             * @description
             * Enable HTML Minification in dev mode only
             */
            minimize: false,

            /**
             * @name removeComments
             * @type {Boolean}
             *
             * @description
             * Remove HTML comments in non dev mode
             */
            removeComments: true
          }
        }
      },

      /** SCSS Compiler */
      {
        test: CONSTANT.SCSS_TEST,

        exclude: /node_modules/,

        use: [
          /**
           * Loader to extract file into path
           * and inject into index file
           */
          MiniCssExtractPlugin.loader,

          /**
           * Analyze and Load CSS
           */
          {
            loader  : 'css-loader',
            options : {
              modules           : true,
              camelCase         : 'only',
              sourceMap         : true,
              importLoaders     : 2,
              localIdentName    : '[name]__[local]___[hash:base64:5]'
            }
          },

          /**
           * Apply PostCSS Loader
           */
          {
            loader: 'postcss-loader'
          },

          /**
           * SCSS Compiler Loader
           */
          {
            loader  : 'sass-loader',
            options : {
              sourceMap: true
            }
          }
        ]
      },

      /** Image Assets */
      {
        test: /\.(png|jpe?g|gif)/,

        use: [{

          loader: 'url-loader',

          options: {
            fallback         : 'file-loader',                    // url-loader will use fallback method
            name             : '[sha512:hash:base64:8].[ext]',
            limit            : 8192,
            outputPath       : 'assets/image',
            publicPath       : '/assets/image',
            useRelativePaths : true
          }

        }]
      },

      /** Fonts Loader */
      {

        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,

        exclude: [/assets\/(svg|image)/, /node_modules/],

        issuer: {
          test: /\.s?css$/
        },

        use: [{
          loader  : 'file-loader',
          options : {
            name       : '[name].[ext]',
            outputPath : 'assets/fonts/',
            publicPath : '../fonts/'
          }
        }]
      }

    ].filter(isObject)

  }

};
