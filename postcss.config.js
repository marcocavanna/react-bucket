module.exports = {

  plugins: {
    'postcss-import'            : {},
    autoprefixer                : {},
    'postcss-sort-media-queries': { sort: 'mobile-first' },
    'css-declaration-sorter'    : { order: 'alphabetical' },
    'postcss-discard-duplicates': {},
    'postcss-import-url'        : {},
    'postcss-single-charset'    : {},
    'postcss-momentum-scrolling': {},
    'postcss-merge-rules'       : {},

    ...(process.env.NODE_ENV === 'production'

        /** Plugins for Production Mode Only */
        ? { cssnano: {} }

        /** Plugins for Development Mode Only */
        : { 'postcss-discard-comments': {}, 'postcss-single-line': {} }

    ),

    'postcss-reporter': {}

  }
};
