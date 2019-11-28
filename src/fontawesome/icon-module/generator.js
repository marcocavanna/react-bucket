const fs = require('fs');
const path = require('path');

/**
 * FontAwesome Json File can be downloaded on
 * FontAwesome Git Repository from
 * https://github.com/FortAwesome/Font-Awesome/blob/master/metadata/icons.json
 */
const fontAwesomeSource = require('./fontawesome_src.json');

const purgedFaJson = {};
const purgedFaModule = [];
const allFaIcon = [];

let totalIcon = 0;

/**
 * Loop All FontAwesome Icon
 * to build the three file (json, js, d.ts)
 * with unicode and class name
 */
Object
  .getOwnPropertyNames(fontAwesomeSource)
  .forEach((iconName) => {

    /**
     * Get Property from File
     */
    const { styles, unicode, free } = fontAwesomeSource[iconName];

    /**
     * Replace the icon name, adding a space
     * instead of - sign (to increase accessibility
     * while using icon)
     */
    const icon = iconName.replace(/-/g, ' ');

    /**
     * If Icon has no 'free' version,
     * then skip the process
     */
    if (!Array.isArray(free) || !Array.isArray(styles)) {
      return;
    }

    /**
     * Populate the Icon Array
     */
    allFaIcon.push(`'${icon}'`);

    /**
     * Build Style Class Array
     */
    const stylesClass = styles.reduce((styleObject, styleName) => ({
      ...styleObject,
      [styleName]: `fa${styleName.charAt(0)} fa-${iconName}`
    }), {});

    /**
     * Build Named Class String
     */
    const namedClass = styles.reduce((classes, styleName) => {
      classes.push(`${styleName}: 'fa${styleName.charAt(0)} fa-${iconName}'`);
      return classes;
    }, []);

    totalIcon += styles.length;

    /**
     * Check if icon name must be quoted to avoid
     * error into the Javascript Files
     */
    const quotedIconName = /(^\d)|\s/.test(icon) ? `'${icon}'` : icon;

    /**
     * Push information into object
     */
    purgedFaJson[icon] = { classes: stylesClass, unicode };
    purgedFaModule.push(`  ${quotedIconName}: {
    classes: {
      ${namedClass.join(',\n      ')}
    },
    unicode: '${unicode}'
  }`);

  });

/**
 * Write the Json File
 */
fs.writeFileSync(
  path.resolve(__dirname, 'fa-icon.json'),
  JSON.stringify(purgedFaJson, null, 2),
  { encoding: 'utf8' }
);

/**
 * Write the Js Module
 */
fs.writeFileSync(
  path.resolve(__dirname, 'fa-mapper.js'),
  `/* eslint-disable key-spacing */\nmodule.exports = {\n${purgedFaModule.join(',\n')}\n};\n`,
  { encoding: 'utf8' }
);

/**
 * Write the Declarative Type Files
 */
fs.writeFileSync(
  path.resolve(__dirname, 'fa-icon.d.ts'),
  `export type ReactBucketICON = ${allFaIcon.join(' |\n  ')}`,
  { encoding: 'utf8' }
);

global.console.log(`A Total of ${totalIcon} FontAwesome Icon has been produced`);
