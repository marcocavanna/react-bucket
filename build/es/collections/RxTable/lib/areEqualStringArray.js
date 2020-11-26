'use strict';

function areEqualStringArray(first, second) {
  return (
    first.length === second.length && first.join('%%') === second.join('%%')
  );
}

module.exports = areEqualStringArray;
//# sourceMappingURL=areEqualStringArray.js.map
