/**
 * Calculate with DOM element use to render a component
 *
 * @param {Function} Component A State-less component or a ReactClass
 * @param {Object} props A ReactElement props object
 * @param {Function} [getDefault] A Function that must return a default element type
 *
 * @returns {String|Function} A ReactElement Type
 */
function getElementType(Component, props, getDefault) {

  // Get Component default props
  const { defaultProps = {} } = Component;

  // Return a user defined element type
  if (props.as && props.as !== defaultProps.as) return props.as;

  // Use the getDefault function to calculate the element
  if (typeof getDefault === 'function') {
    const elementType = getDefault();
    if (elementType) return elementType;
  }

  // Use the href property to refer to anchor
  if (props.href) return 'a';

  // Use the default props, or fallback to div
  return defaultProps.as || 'div';

}

// eslint-disable-next-line import/prefer-default-export
export { getElementType };
