import PropTypes from 'prop-types';
import fontAwesomeClass from '../../fontawesome/icon-module/fa-mapper';

import * as RBUI from './RBUI';

const fontAwesomeArray = Object.getOwnPropertyNames(fontAwesomeClass);

export const as = (...args) => PropTypes
  .oneOfType([PropTypes.func, PropTypes.object, PropTypes.string, PropTypes.symbol])(...args);

export const textAlign = (...args) => PropTypes
  .oneOf(['left', 'right', 'center'])(...args);

export const responsiveBreakpoint = (...args) => PropTypes
  .oneOf(['phone', 'tablet', 'desktop', 'large-desktop'])(...args);

export const flexVerticalAlign = (...args) => PropTypes
  .oneOf(['on top', 'center', 'on bottom', 'stretched'])(...args);

export const flexHorizontalAlign = (...args) => PropTypes
  .oneOf(['on start', 'centered', 'on end', 'spaced between', 'spaced around'])(...args);

export const breakpoints = (...args) => PropTypes
  .oneOf(['on phone', 'on tablet', 'on desktop', 'on large desktop'])(...args);

export const size = (...args) => PropTypes
  .oneOf(RBUI.SIZE)(...args);

export const columnsWidth = (...args) => PropTypes
  .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])(...args);

export const columnsOffset = (...args) => PropTypes
  .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'])(...args);

export const fontAwesome = (...args) => PropTypes
  .oneOf(fontAwesomeArray)(...args);

export const responsiveProperty = (...args) => PropTypes.oneOfType([
  PropTypes.bool,
  breakpoints
])(...args);

export const numbersRange = (from, to) => {
  const numberArr = [];

  for (let i = from; i <= to; i++) {
    numberArr.push(i);
  }

  return (...args) => PropTypes.oneOfType([
    PropTypes.oneOf(numberArr),
    PropTypes.oneOf(numberArr.map(i => i.toString()))
  ])(...args);

};
