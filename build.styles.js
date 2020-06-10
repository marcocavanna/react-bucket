/* --------
 * Import Node Utilities
 * -------- */
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs');


/* --------
 * Import Compiler Utilities
 * -------- */
const sass = require('node-sass');
const postcss = require('postcss');


/* --------
 * Import and Set PostCSS Plugins
 * -------- */
const autoprefixer = require('autoprefixer');
const sortMediaQuery = require('postcss-sort-media-queries');
const declarationSorter = require('css-declaration-sorter');
const discardDuplicates = require('postcss-discard-duplicates');
const importUrl = require('postcss-import-url');
const singleCharset = require('postcss-single-charset');
const momentumScrolling = require('postcss-momentum-scrolling');
const mergeRules = require('postcss-merge-rules');
const discardComments = require('postcss-discard-comments');
const singleLine = require('postcss-single-line');
const cssnano = require('cssnano');

const postCssPlugin = [
  momentumScrolling,
  mergeRules,
  importUrl,
  discardDuplicates,
  declarationSorter,
  sortMediaQuery,
  singleCharset,
  autoprefixer
];

if (process.env.NODE_ENV === 'production') {
  postCssPlugin.push(
    discardComments,
    singleLine,
    cssnano
  );
}


/* --------
 * Set Path Helpers
 * -------- */
const sourceDir = (...args) => resolve(__dirname, 'src', 'styles', ...args);
const destDir = (...args) => resolve(__dirname, 'dist', ...args);


/* --------
 * Declare the Function to Build SASS and to use PostCSS
 * -------- */
function buildCSSFile(filenameSrc, filenameDest) {
  /** Set file Paths */
  const fileSrc = sourceDir(`${filenameSrc}.scss`);
  const fileDest = destDir(`${filenameDest}.css`);
  const mapDest = destDir(`${filenameDest}.css.map`);

  /** Return a Promise with Compiler Result */
  return new Promise((resolve, reject) => {
    /** Start build */
    global.console.log(`[${filenameSrc}] : Start building '${relative(__dirname, fileSrc)}' to '${relative(
      __dirname,
      fileDest
    )}'`);
    /** Render the SCSS File */
    sass.render({
      /** Set the source file */
      file          : fileSrc,
      /** Set the out file to use SourceMap */
      outFile       : fileDest,
      outputStyle   : 'expanded',
      /** Set sourcemap options */
      sourceMapRoot : sourceDir(),
      sourceMapEmbed: true
    }, (error, result) => {
      /** If an error occurred reject the build promise */
      if (error) {
        return reject({
          type: 'sass-error',
          error
        });
      }

      global.console.log(`[${filenameSrc}] : Compiled SCSS to CSS`);

      /** Pass the result to the PostCSS Processor */
      return postcss(postCssPlugin).process(result.css, {
          from: fileSrc,
          to  : fileDest,
          map : {
            inline: false
          }
        })
        .then((postCSSResult) => {
          global.console.log(`[${filenameSrc}] : Processed CSS with PostCSS`);
          /** Save Compiled File */
          try {
            /** Save CSS */
            writeFileSync(fileDest, postCSSResult.css);
            writeFileSync(mapDest, postCSSResult.map);
            global.console.log(`[${filenameSrc}] : File Written`);
          }
          catch (e) {
            return reject({
              type : 'write-error',
              error: e
            });
          }
        })
        .catch((error) => {
          return reject({
            type: 'postcss-error',
            error
          });
        });
    });
  });
}


/* --------
 * Compile Files
 * -------- */
const entries = {
  index: 'all',
  grid : 'grid'
};

async function build() {

  const buildsPromises = [];

  Object.keys(entries).forEach((filenameSrc) => {
    buildsPromises.push(
      buildCSSFile(filenameSrc, entries[filenameSrc])
    );
  });

  await Promise.all(buildsPromises);
}

(async () => {
  try {
    global.console.log(`Start building ${Object.keys(entries).length} files`);
    await build();
  }
  catch (e) {
    global.console.log('Error : ');
    global.console.log(e);
    process.exit(1);
  }
})();
