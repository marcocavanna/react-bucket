const fs = require('fs');
const yaml = require('yaml');
const { resolve } = require('path');
const prettier = require('prettier');


/* --------
 * Helpers function to Transform a Promise into an Array
 * -------- */
const awaitPromise = async (fn) => {
  try {
    const result = await fn;
    return [ null, result ];
  }
  catch (e) {
    return [ e, null ];
  }
};


/* --------
 * Define Paths
 * -------- */
const faPath = (...args) => resolve(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free', ...args);

const faMetadataFile = faPath('metadata', 'icons.yml');

const destDir = (...args) => resolve(__dirname, 'src', 'react', ...args);


/* --------
 * Defined Containers For All Icon
 * -------- */
const faIconsName = [];
const faIcons = [];


/* --------
 * Parse the YML Metadata File
 * -------- */
async function parseYamlMetadata() {
  try {
    /** Get the File */
    const file = fs.readFileSync(faMetadataFile, 'utf-8');

    /** Check file Exists */
    if (!file) {
      throw new Error('YML File Doesnt exists');
    }

    /** Return Parsed File */
    return yaml.parse(file);
  }
  catch (e) {
    throw { type: 'yml-parser', error: e };
  }
}


/* --------
 * Compile FontAwesome Files
 * -------- */
(async () => {
  /** Parse Metadata File */
  const [ parseError, faMetadata ] = await awaitPromise(parseYamlMetadata());

  /** Stop process if a parse error occurred */
  if (parseError) {
    global.console.log(parseError);
    process.exit(1);
  }

  /**
   * Loop each FontAwesome found Icon
   * to build the descriptors
   */
  Object
    .getOwnPropertyNames(faMetadata)
    .forEach((iconName) => {
      /** Get Icon Property */
      const { styles, label, unicode } = faMetadata[iconName];

      /**
       * Build the icon name, replacing minus
       * separator with space, to increase
       * icon usage
       */
      const icon = iconName.replace(/-/g, ' ');

      /** Safe check icon has at least one style */
      if (!Array.isArray(styles) || !styles.length) {
        return;
      }

      /** Add the icon to faIcon array */
      faIconsName.push(`'${icon}'`);

      /**
       * Check if icon name must be quoted to avoid
       * error into the Javascript Files
       */
      const quotedIconName = /(^\d)|\s/.test(icon) ? `'${icon}'` : icon;

      /** Add icons descriptor */
      faIcons.push(`  ${quotedIconName}: {
      classes: {
        ${styles.map((name) => `${name}: 'fa${name.charAt(0)} fa-${iconName}'`).join(',\n      ')}
      },
      unicode: '${unicode}',
      label: '${label.replace(/'/g, '\\\'')}'
    }`);
    });

  /** Write files */
  try {
    /** Write Declaration */
    fs.writeFileSync(
      destDir('fontawesome.d.ts'),
      `export type FontAwesomeIconStyle = 'brands' | 'regular' | 'solid';\n\nexport type FontAwesomeIcon =\n  | ${faIconsName.join(
        '\n  | ')};`,
      { encoding: 'utf-8' }
    );

    /** Write Mapper */
    fs.writeFileSync(
      destDir('lib', 'fontAwesomeMapper.ts'),
      prettier.format(
        `export default {\n${faIcons.join(',\n')}\n} as { [icon: string]: { classes: { brands?: string, regular?: string, solid?: string }, unicode: string, label: string } };\n`,
        {
          singleQuote   : true,
          trailingComma : 'es5',
          bracketSpacing: true,
          jsxSingleQuote: true,
          parser        : 'typescript'
        }
      ),
      { encoding: 'utf-8' }
    );
  }
  catch (e) {
    global.console.log(e);
    process.exit(1);
  }
})();
