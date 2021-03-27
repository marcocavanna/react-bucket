const fs = require('fs');
const { resolve } = require('path');

const SVGO = require('svgo');
const prettier = require('prettier');
const { default: svgr } = require('@svgr/core');


/* --------
 * Define SVGO Optimizer Plugins
 * -------- */
const svgo = new SVGO({
  plugins: [
    { removeXMLProcInst: true },
    { removeXMLNS: true },
    { removeEmptyContainers: true }
  ]
});

/* --------
 * Define Prettier Options
 * -------- */
const prettierConfig = {
  semi              : true,
  singleQuote       : true,
  quoteProps        : 'preserve',
  jsxSingleQuote    : true,
  trailingComma     : 'es5',
  jsxBracketSameLine: false,
  parser            : 'typescript'
};

/* --------
 * Set SVGR Options
 * -------- */
const svgrConfig = {
  /** Transform to use as Icon */
  icon: true,

  /** Wrap Component in useMemo hook */
  memo: true,

  /** Transform in Typescript File */
  typescript: true
};


/* --------
 * Define the Build SVG Icons
 * -------- */
function buildSVGIcons(path, dest) {

  /** Read Folders */
  const contents = fs
    /** Get all files */
    .readdirSync(path)
    /** Read for svg only */
    .filter(filename => /\.svg$/.test(filename))
    /** Build Component Name */
    .map(filename => ({
      filename,
      componentName: filename
        .replace(/\.svg$/, '')
        .replace(/-/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
        .replace(/\s+/g, '')
    }));

  /** Loop each File to build the TSX */
  contents.forEach(async ({ filename, componentName }) => {
    /** Read File */
    const fileContent = fs.readFileSync(resolve(path, filename)).toString('utf-8');

    /** Optimize content using SVGO */
    const optimizedContent = (await svgo.optimize(fileContent)).data;

    /** Transform Content */
    const transformed = svgr.sync(optimizedContent, svgrConfig, { componentName });

    /** Format Code using Prettier */
    const formatted = prettier.format(transformed, prettierConfig);

    /** Save file into dest */
    fs.writeFileSync(resolve(dest, `${componentName}.tsx`), formatted);

    /** Write Console */
    global.console.log(`Written ${componentName}.tsx`);
  });

  /** Write a Global index ts exporting all Icons */
  const exportsStatement = contents.map(({ componentName }) => (
    `export { default as ${componentName} } from './${componentName}';\n`
  ));

  fs.writeFileSync(resolve(dest, 'index.ts'), exportsStatement.join('\n'));
  global.console.log('Written the index.ts file');
}

buildSVGIcons(
  resolve(__dirname, 'source'),
  resolve(__dirname, 'dest')
);
