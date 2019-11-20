/**
 * @section @name BabelConfiguration
 *
 * @description
 * Export the Babel Configuration function
 */
module.exports = function babelConfig(api) {

  /** Enable the Babel Cache */
  api.cache(true);

  return {
    /** Strip Comments in Production */
    comments   : process.env.NODE_ENV === 'development',

    /** Minify Javascript in Production */
    compact    : process.env.NODE_ENV === 'production',

    /** Set Presets to Transpile React */
    presets    : [
      ['@babel/preset-env', {
        useBuiltIns : 'usage',
        corejs      : 3,
        debug       : process.env.NODE_ENV === 'development'
      }],
      '@babel/react'
    ],

    /** Append Plugins */
    plugins    : [
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
          mode         : process.env.NODE_ENV === 'development' ? 'wrap' : 'remove',
          removeImport : process.env.NODE_ENV === 'production'
        }
      ],

      /**
       * Auto Require React if code contain
       * react element
       * https://github.com/vslinko/babel-plugin-react-require */
      'react-require'
    ],

    /** In development mode add Source Maps */
    ...(process.env.NODE_ENV === 'development' && {
      sourceMaps  : 'inline',
      retainLines : true
    })

  };

};
