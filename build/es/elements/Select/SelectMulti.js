'use strict';

var Select = require('./Select.js');

var SelectMulti = function (props) {
  return Select.create(props, {
    autoGenerateKey: false,
    overrideProps: {
      isMulti: true,
    },
  });
};

module.exports = SelectMulti;
//# sourceMappingURL=SelectMulti.js.map
