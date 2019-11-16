const nullRefObject = { current: null };

const refObjects = new WeakMap();

const toRefObject = (node) => {
  if (node === null) {
    return nullRefObject;
  }

  if (refObjects.has(node)) {
    return refObjects.get(node);
  }

  const refObject = { current: node };
  refObjects.set(node, refObject);

  return refObject;
};

export default toRefObject;
