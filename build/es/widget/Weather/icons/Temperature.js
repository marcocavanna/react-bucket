'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var React = require('react');

function Temperature(props) {
  return React.createElement(
    'svg',
    _tslib.__assign(
      { viewBox: '0 0 512 512', width: '1em', height: '1em' },
      props
    ),
    React.createElement('path', {
      d: 'M304 64v224h-96V64c0-26.56 21.44-48 48-48s48 21.44 48 48z',
      fill: '#90A4AE',
    }),
    React.createElement('path', {
      d:
        'M336 416c0 44.16-35.84 80-80 80s-80-35.84-80-80c0-26.24 12.48-49.28 32-64v-64h96v64c19.52 14.72 32 37.76 32 64z',
      fill: '#F44336',
    }),
    React.createElement(
      'g',
      { fill: '#ECEFF1' },
      React.createElement('path', {
        d:
          'M256 512c-52.928 0-96-43.072-96-96 0-27.648 11.552-53.312 32-71.552V64c0-35.296 28.704-64 64-64s64 28.704 64 64v280.448c20.448 18.24 32 43.904 32 71.552 0 52.928-43.072 96-96 96zm0-480c-17.632 0-32 14.368-32 32v288a15.99 15.99 0 01-6.368 12.768C201.344 377.056 192 395.712 192 416c0 35.296 28.704 64 64 64s64-28.704 64-64c0-20.288-9.344-38.944-25.632-51.232A15.99 15.99 0 01288 352V64c0-17.632-14.368-32-32-32zm-48 320h.32-.32z',
      }),
      React.createElement('path', {
        d:
          'M272 128c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v-32h-48zM272 224c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v-32h-48z',
      })
    )
  );
}
var MemoTemperature = React.memo(Temperature);

module.exports = MemoTemperature;
//# sourceMappingURL=Temperature.js.map
