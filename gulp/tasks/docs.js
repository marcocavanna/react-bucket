/* eslint-disable import/no-extraneous-dependencies */
import { task, src, dest, lastRun } from 'gulp';
import path from 'path';

import gulpReactDocgen from '../plugins/gulp-react-docgen';

import config from '../../config';

const { paths } = config;

/**
 * Converts paths with globs to supported by chokidar, is more specific for Windows where
 * is different path sep.
 * Example of the failure behaviour: "C:\projects\docs/examples/index.js"
 *
 * @param {String} directory
 * @param {String} glob
 * @returns {String}
 */
const toUniversalGlob = (directory, glob) => {
  const relative = path
    .relative(process.cwd(), directory)
    .split(path.sep)
    .join('/');

  return `${relative}/${glob}`;
};

const componentsSrc = [
  toUniversalGlob(paths.src(), 'addons/*/*.js'),
  toUniversalGlob(paths.src(), 'collections/*/*.js'),
  toUniversalGlob(paths.src(), 'elements/*/*.js'),
  toUniversalGlob(paths.src(), 'modules/*/*.js'),
  '!**/index.js',
  '!**/RxTableData.js'
];

task('build:docs:docgen', () => src(componentsSrc, { since: lastRun('build:docs:docgen') })
  .pipe(gulpReactDocgen())
  .pipe(dest(paths.docsSrc('docs', 'component-info'))));
