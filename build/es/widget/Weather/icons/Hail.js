'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var React = require('react');

function Hail(props) {
  return React.createElement(
    'svg',
    _tslib.__assign(
      { viewBox: '0 0 512 512', width: '1em', height: '1em' },
      props
    ),
    React.createElement('path', {
      d:
        'M416 144c-1.024 0-2.048 0-3.136.032C397.952 70.016 333.088 16 256 16c-64.032 0-121.504 38.112-146.688 96.032C48.8 113.472 0 163.136 0 224c0 61.76 50.24 112 112 112h304c52.928 0 96-43.072 96-96s-43.072-96-96-96z',
      fill: '#E3F2FD',
    }),
    React.createElement('path', {
      d:
        'M242.848 374.912C232.352 390.048 208 427.52 208 448c0 26.464 21.536 48 48 48s48-21.536 48-48c0-20.48-24.352-57.952-34.848-73.088-5.952-8.64-20.352-8.64-26.304 0z',
      fill: '#2196F3',
    }),
    React.createElement(
      'g',
      { fill: '#CFD8DC' },
      React.createElement('circle', { cx: 112, cy: 416, r: 48 }),
      React.createElement('circle', { cx: 400, cy: 416, r: 48 })
    )
  );
}
var MemoHail = React.memo(Hail);

module.exports = MemoHail;
//# sourceMappingURL=Hail.js.map
