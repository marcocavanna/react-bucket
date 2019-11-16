import _ from 'lodash';
import _fp from 'lodash/fp';

const computeClassNames = _fp.flow(
  _fp.toArray,
  _fp.map('props.className'),
  _fp.flatMap(_fp.split(/\s+/)),
  _fp.filter(_fp.identity),
  _fp.uniq
);

const computeClassNamesDifference = (prev, curr) => [
  _.difference(curr, prev),
  _.difference(prev, curr)
];

const prevClassNames = new Map();

const handleClassNamesChange = (ref, components) => {
  const currentClassNames = computeClassNames(components);
  const [forAdd, forRemoval] = computeClassNamesDifference(
    prevClassNames.get(ref),
    currentClassNames
  );

  if (ref.current) {
    _.forEach(forAdd, className => ref.current.classList.add(className));
    _.forEach(forRemoval, className => ref.current.classList.remove(className));
  }

  prevClassNames.set(ref, currentClassNames);
};

export default handleClassNamesChange;

export { computeClassNames, computeClassNamesDifference };
