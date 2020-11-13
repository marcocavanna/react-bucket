const reactDocgenTypescript = require('react-docgen-typescript');

module.exports = {
  /** Set Typescript as PropsParser */
  propsParser  : reactDocgenTypescript.withDefaultConfig({
    /** Remove Props of React Core Component */
    propFilter                        : (prop) => {
      return !/^(DOMAttributes|AriaAttributes|HTMLAttributes|Attributes)$/.test(prop.parent.name);

    },
    /** Extract Literal Value from Type */
    shouldExtractLiteralValuesFromEnum: true
  }).parse,
  /** Set Components Folder */
  components   : './src/react/**/*.tsx',
  /** Ignore some files */
  ignore       : [
    './**/*.scss',
    './src/react/**/*.stories.tsx',
    './src/react/stories.tsx',
    './src/react/collections/Form/FormikFields.tsx',
    './src/react/widget/Weather/icons/*.tsx'
  ],
  /** Set a minimal webpack config */
  webpackConfig: {
    module: {
      rules: [
        {
          test  : /\.tsx?$/,
          loader: 'ts-loader'
        }
      ]
    }
  }
};
