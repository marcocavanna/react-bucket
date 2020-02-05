/** Build a Cache to avoid multiple regexp match */
const cache = {};

/** Build the Mapping Array */
const mapping = [
  /** Image Files */
  ['file image', /^image\//],

  /** Audio Files */
  ['file audio', /^audio\//],

  /** Video Files */
  ['file video', /^video\//],

  /** Documents Files */
  ['file pdf', 'application/pdf'],
  ['file alt', 'text/plain'],
  ['file code', [
    'text/html',
    'text/javascript',
    'text/css',
    /application\/(ld\+)?json$/,
    /application\/(x-)?sh$/
  ]],

  /** Archive */
  ['file archive', [
    /^application\/x-(g?tar|xz|compress|bzip2?|g?zip)$/,
    /^application\/x-(7z|rar|zip)-compressed$/,
    /^application\/(zip|gzip|tar)$/
  ]],

  /** Word */
  ['file word', [
    /ms-?word/,
    'application/vnd.oasis.opendocument.text',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]],

  /** PowerPoint */
  ['file powerpoint', [
    /ms-?powerpoint/,
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.oasis.opendocument.presentation'
  ]],

  /** Excel */
  ['file excel', [
    /ms-?excel/,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.oasis.opendocument.spreadsheet'
  ]],

  /** Default */
  ['file alt']
];

function match(mimetype, cond) {
  if (Array.isArray(cond)) {
    return cond.reduce((v, c) => v || match(mimetype, c), false);
  }

  /** For Simple Test */
  if (cond instanceof RegExp) {
    return cond.test(mimetype);
  }

  /** For Default Icon */
  if (cond === undefined) {
    return true;
  }

  /** Return equality */
  return mimetype === cond;
}

export default function mimetypeToFontawesome(mimetype) {
  if (cache[mimetype]) {
    return cache[mimetype];
  }

  for (let i = 0; i < mapping.length; i++) {
    if (match(mimetype, mapping[i][1])) {
      // eslint-disable-next-line prefer-destructuring
      cache[mimetype] = mapping[i][0];
      return mapping[i][0];
    }
  }

  return 'file alt';
}
