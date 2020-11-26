'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var React = require('react');

function Thunderstorm(props) {
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
        'M301.152 342.88c-2.976-4.32-7.904-6.88-13.152-6.88h-32v-80c0-7.744-5.536-14.368-13.12-15.744-7.552-1.28-15.136 2.88-17.856 10.112l-48 128c-1.856 4.896-1.152 10.432 1.824 14.752A16.004 16.004 0 00192 400h32v80a15.992 15.992 0 0013.152 15.744c.96.16 1.92.256 2.88.256 6.56 0 12.608-4.064 14.976-10.368l48-128a16.137 16.137 0 00-1.856-14.752z',
      fill: '#FFC107',
    })
  );
}
var MemoThunderstorm = React.memo(Thunderstorm);

module.exports = MemoThunderstorm;
//# sourceMappingURL=Thunderstorm.js.map
