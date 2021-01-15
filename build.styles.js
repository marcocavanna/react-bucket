/* --------
 * Import Node Utilities
 * -------- */
const path = require('path');
const { writeFileSync, existsSync, mkdirSync } = require('fs');


/* --------
 * Import Compiler Utilities
 * -------- */
const sass = require('node-sass');
const packageImporter = require('node-sass-package-importer');

const postcss = require('postcss');
const { getPostCSSPlugins } = require('@appbuckets/postcss-react-bucket');


/* --------
 * Set Path Helpers
 * -------- */
const sourceDir = (...args) => path.resolve(__dirname, 'src', 'styles', ...args);
const destDir = (...args) => path.resolve(__dirname, 'build', 'styles', ...args);


/* --------
 * Declare the Function to Build SASS and to use PostCSS
 * -------- */
function buildCSSFile(filenameSrc, filenameDest) {
  /** Check Dir exists */
  if (!existsSync(destDir())) {
    mkdirSync(destDir(), { recursive: true });
  }

  /** Set file Paths */
  const fileSrc = sourceDir(`${filenameSrc}.scss`);
  const fileDest = destDir(`${filenameDest}.css`);
  const mapDest = destDir(`${filenameDest}.css.map`);

  /** Return a Promise with Compiler Result */
  return new Promise((resolve, reject) => {
    /** Start build */
    global.console.log(`[${filenameSrc}] : Start building '${
      path.relative(__dirname, fileSrc)
    }' to '${
      path.relative(
        __dirname,
        fileDest
      )
    }'`);
    /** Render the SCSS File */
    sass.render({
      /** Set the source file */
      file: fileSrc,
      /** Add the package importer to use ~ */
      importer: packageImporter(),
      /** Set the out file to use SourceMap */
      outFile    : fileDest,
      outputStyle: 'expanded',
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
      return postcss(getPostCSSPlugins())
        .process(result.css, {
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
        .catch((postCSSError) => {
          return reject({
            type: 'postcss-error',
            postCSSError
          });
        });
    });
  });
}


/* --------
 * Compile Files
 * -------- */
const entries = {
  index: 'build'
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
