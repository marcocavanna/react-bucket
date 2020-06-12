module.exports = {

  plugins: {
    'postcss-import'            : {},
    'postcss-momentum-scrolling': {},
    'postcss-merge-rules'       : {},
    'postcss-import-url'        : {},
    'postcss-discard-duplicates': {},
    'css-declaration-sorter'    : { order: 'alphabetical' },
    'postcss-sort-media-queries': { sort: 'mobile-first' },
    'postcss-single-charset'    : {},
    autoprefixer                : {},

    ...(process.env.NODE_ENV === 'production'

        /** Plugins for Production Mode Only */
        ? {
          'postcss-discard-comments': {},
          'postcss-single-line'     : {},
          cssnano                   : {}
        }

        /** Plugins for Development Mode Only */
        : {}

    ),

    'postcss-reporter': {}

  }
};
