/**
 * Return an Object containing all props that are not
 * used directly by a component
 *
 * @param {Function} Component A Function or a ReactClass
 * @param {Object} props The Component props object
 *
 * @return {Object} A shallow copy of unhandled props
 */
function getUnhandledProps(Component, props) {
  /**
   * The unhandled props key is generate automatically by babel
   * using 'babel-plugin-transform-react-handled-props'
   */
  const { handledProps = [] } = Component;

  return Object.keys(props).reduce((propsObject, nextProp) => {
    if (nextProp === 'childKey') return propsObject;
    if (handledProps.indexOf(nextProp) === -1) {
      // eslint-disable-next-line no-param-reassign
      propsObject[nextProp] = props[nextProp];
    }
    return propsObject;
  }, {});
}

// eslint-disable-next-line import/prefer-default-export
export { getUnhandledProps };
