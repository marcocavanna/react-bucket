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
    './src/react/**/*.stories.tsx',
    './src/react/stories.tsx'
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
