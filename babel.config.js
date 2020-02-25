/**
 * @section @name BabelConfiguration
 *
 * @description
 * Export the Babel Configuration function
 */
module.exports = function babelConfig(api) {

  const { NODE_ENV } = process.env;

  const isTest = NODE_ENV === 'test';
  const isProduction = NODE_ENV === 'production';
  const isDevelopment = NODE_ENV === 'development';

  /** Enable the Babel Cache */
  api.cache(true);

  return {
    /** Strip Comments in Production */
    comments: isDevelopment || isTest,

    /** Minify Javascript in Production */
    compact: isProduction,

    /** Set Presets to Transpile React */
    presets: [
      ['@babel/preset-env', {
        useBuiltIns : 'usage',
        corejs      : 3,
        debug       : isDevelopment || isTest
      }],
      '@babel/react'
    ],

    /** Append Plugins */
    plugins: [
      /** https://babeljs.io/docs/en/babel-plugin-transform-runtime */
      '@babel/plugin-transform-runtime',

      /** https://babeljs.io/docs/en/babel-plugin-proposal-class-properties */
      '@babel/plugin-proposal-class-properties',

      /** https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from */
      '@babel/plugin-proposal-export-default-from',

      /** https://babeljs.io/docs/en/babel-plugin-proposal-export-namespace-from */
      '@babel/plugin-proposal-export-namespace-from',

      /**
         * Allow the usage of the optional chaning
         * in object, like a.b?.c?
         * https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
         */
      '@babel/plugin-proposal-optional-chaining',

      '@babel/plugin-proposal-nullish-coalescing-operator',

      /**
         * Plugins for Development Environment only
         */
      ...(process.env.NODE_ENV === 'development' ? [

        /**
           * Add Filename and Row for Console.log statement
           * https://github.com/peteringram0/babel-plugin-console-source
           */
        ['console-source',
          {
            segments: 2
          }
        ]

      ] : []),

      /**
         * Plugins for production only
         */
      ...(process.env.NODE_ENV === 'production' ? [

        /**
           * Remove Console Log and Debugger
           * https://github.com/betaorbust/babel-plugin-groundskeeper-willie
           */
        'groundskeeper-willie'

      ] : []),

      /**
       * Pick only Lodash required module
       * https://github.com/lodash/babel-plugin-lodash
       */
      'lodash',

      /**
       * Get an Object Containing all unhandled props
       * https://www.npmjs.com/package/babel-plugin-transform-react-handled-props
       */
      'transform-react-handled-props',

      /** https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types */
      ['transform-react-remove-prop-types',
        {
          mode         : (isDevelopment || isTest) ? 'wrap' : 'remove',
          removeImport : isProduction
        }
      ],

      /**
       * Auto Require React if code contain
       * react element
       * https://github.com/vslinko/babel-plugin-react-require */
      'react-require',

      /** Include Coverage Plugin in Test Mode */
      ...(isTest ? [
        ['istanbul', { include: ['src'] }]
      ] : [])
    ],

    /** In development mode add Source Maps */
    ...((isDevelopment || isTest) && {
      sourceMaps  : 'inline',
      retainLines : true
    })

  };

};
