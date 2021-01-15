const MiniCSSExtractPlugin = require('mini-css-extract-plugin');


module.exports = {

  stories: [ `../src/react/**/*.stories.${process.env.DOCS === '1' ? 'mdx' : 'tsx'}` ],

  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    ...(process.env.DOCS === '1' ? [ '@storybook/addon-docs' ] : []),
    {
      name   : '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          parser: 'typescript'
        }
      }
    }
  ],

  webpackFinal: async (config) => {

    /** Exclude FontAwesome from Fonts Url */
    config.module.rules = config.module.rules.map((rule) => {
      if (/(eot|ttf|woff|woff2|svg)/.test(rule.test)) {
        if (!Array.isArray(rule.exclude)) {
          rule.exclude = [];
        }

        rule.exclude.push(/@fortawesome/);
      }

      return rule;
    });

    config.module.rules.push(
      {
        test: /\.tsx?$/,
        use : [
          { loader: require.resolve('ts-loader') }
        ]
      },

      // Parse source typescript files
      {
        test   : /\.stories\.tsx?$/,
        loaders: [
          {
            loader : require.resolve('@storybook/source-loader'),
            options: { parser: 'typescript' }
          }
        ],
        enforce: 'pre'
      },

      {
        test   : /\.(eot|ttf|woff|woff2|svg)$/,
        include: [ /@fortawesome/ ],
        use    : {
          loader : 'file-loader',
          options: {
            name      : '[name].[ext]',
            outputPath: './assets/fontawesome',
            publicPath: './assets/fontawesome'
          }
        }
      },

      // Use Extract Text Plugin to get and compile Style
      {
        test   : /\.scss$/,
        exclude: /node_modules/,
        use    : [
          // MiniCSS Extractor loader
          MiniCSSExtractPlugin.loader,

          // Analyze and Load the CSS
          {
            loader : 'css-loader',
            options: {
              modules      : false,
              importLoaders: 2,
              sourceMap    : true
            }
          },

          // Use PostCSS Loader
          'postcss-loader',

          // Compile SCSS
          {
            loader : 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    );

    config.resolve.extensions.push('.ts', '.tsx');

    config.plugins.push(new MiniCSSExtractPlugin({
      filename: 'style.css'
    }));

    return config;
  }

};
