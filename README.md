# React Bucket

---

ReactBucket is a React CSS and Component Framework.

Documentation is still to write.


---

Install with npm or yarn

```
yarn install @appbuckets/react-bucket

npm install -S @appbuckets/react-bucket
```

### Storybook

To view Storybook download repo and launch `yarn start:storybook`

## Using SCSS Styles

The source files that define the style of ReactBucket can be used in any project, but with some tweaks. PostCSS must be
used to recompile the style correctly without errors. ReactBucket uses a number of plugins, which are essential
primarily for redefining and repositioning media queries.

**PAY ATTENTION** You cannot use `postcss@^8` with this methods.

The plugins used by ReactBucket are:

- `postcss-import`
- `postcss-momentum-scrolling`
- `postcss-merge-rules`
- `postcss-import-url`
- `postcss-discard-duplicates`
- `postcss-sort-media-queries`
- `postcss-single-charset`
- `postcss-discard-comments` in **production** mode only
- `postcss-single-line` in **production** mode only
- `autoprefixer`
- `css-declaration-sorter` in **production** mode only
- `cssnano` in **production** mode only

Instead of having to manually include individual plugins within the `postcss.config.js` file, you can download an
additional repository that includes the configuration necessary to build the stylesheet.

```shell
# Using YARN
yarn add -D @appbuckets/postcss-react-bucket

# Using NPM
npm install -D @appbuckets/postcss-react-bucket
```

and used the `getPostCSSPlugins` function in your `postcss.config.js`:

```javascript
const { getPostCSSPlugins } = require('@appbuckets/postcss-react-bucket');

module.exports = {
  plugins: [
    ...getPostCSSPlugins()
  ]
}
```

A configuration object could be passed to the function to adjust settings or exclude some plugins. Don't exclude plugins
from compiling unless you really need them.

The configuration object can have one or more of the following options:

| Property               | Type                                              | Description                                                         |
|------------------------|:-------------------------------------------------:|:--------------------------------------------------------------------|
| `browserslist`         | `{ development: string[], production: string[] }` | Override default BrowsersList in `development` or `production` mode |
| `cssDeclarationSorter` | `alphabetical` - `smacss` - `concentric-css`      | Set declaration sort order. Default is `alphabetical`               |
| `exclude`              | `string[]`                                        | Exclude some plugin from build                                      |
| `mediaQueriesSorting`  | `mobile-first` - `desktop-first`                  | Set media queries order. Default is `mobile-first`                  |
| `mode`                 | `development` - `production`                      | Set the build mode. If none the NODE_ENV variable will be used      |

### Use Style in combination with Create React App

Unfortunately react-script does not allow you to override or change the app creation settings until you use the eject
function. If you don't want to use the eject function you will have to use an external dependency, called **craco** to
add the necessary plugins

#### 1. Install Craco Package

```shell
# Using YARN
yarn add -D @craco/craco

# Using NPM
npm install -D @craco/craco
```

#### 2. Replace package.json Scripts

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

#### 3. Add the `craco.config.js`

```javascript
const { getPostCSSPlugins } = require('@appbuckets/postcss-react-bucket');

module.exports = {
  /** Extends PostCSS Plugins to Build ReactBucket Style */
  style: {
    postcss: {
      mode   : 'extends',
      plugins: [
        ...getPostCSSPlugins()
      ]
    }
  }
};

```
