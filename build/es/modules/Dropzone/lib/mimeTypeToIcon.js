'use strict';

/** Build a Fast Cache Object to avoid multiple match */
var cache = {};
/** Set the fallback icon */
var fallback = 'file alt';
/** Build a Mapping Array */
var mapping = [
  /** Image Files */
  ['file image', [/^image\//]],
  /** Audio Files */
  ['file audio', [/^audio\//]],
  /** Video Files */
  ['file video', [/^video\//]],
  /** Documents Files */
  ['file pdf', ['application/pdf']],
  ['file alt', ['text/plain']],
  [
    'file code',
    [
      'text/html',
      'text/javascript',
      'text/css',
      /application\/(ld\+)?json$/,
      /application\/(x-)?sh$/,
    ],
  ],
  /** Archive */
  [
    'file archive',
    [
      /^application\/x-(g?tar|xz|compress|bzip2?|g?zip)$/,
      /^application\/x-(7z|rar|zip)-compressed$/,
      /^application\/(zip|gzip|tar)$/,
    ],
  ],
  /** Word */
  [
    'file word',
    [
      /ms-?word/,
      'application/vnd.oasis.opendocument.text',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  ],
  /** PowerPoint */
  [
    'file powerpoint',
    [
      /ms-?powerpoint/,
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.oasis.opendocument.presentation',
    ],
  ],
  /** Excel */
  [
    'file excel',
    [
      /ms-?excel/,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.oasis.opendocument.spreadsheet',
    ],
  ],
];
var match = function (mimeType, conditions) {
  return conditions.reduce(function (hasMatch, condition) {
    /** If a match has been found, stop search */
    if (hasMatch) {
      return true;
    }
    /** Test RexExp */
    if (condition instanceof RegExp) {
      return condition.test(mimeType);
    }
    /** Return strict equality */
    return condition === mimeType;
  }, false);
};
function mimeTypeToIcon(mimeType) {
  /** Check if exists in cache */
  if (cache[mimeType]) {
    return cache[mimeType];
  }
  /** Apply a for cycle */
  for (var i = 0; i < mapping.length; i++) {
    if (match(mimeType, mapping[i][1])) {
      // eslint-disable-next-line prefer-destructuring
      cache[mimeType] = mapping[i][0];
      return mapping[i][0];
    }
  }
  /** Return the fallback icon */
  return fallback;
}

module.exports = mimeTypeToIcon;
//# sourceMappingURL=mimeTypeToIcon.js.map
