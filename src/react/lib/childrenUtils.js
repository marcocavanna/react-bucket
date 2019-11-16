import _ from 'lodash';
import { Children } from 'react';

/**
 * Check if a Childres of a type exists or not
 * @param {Object} children React Children Props
 * @param {string|Function} type An HTML Tag name or a React Component
 * @return {Boolean}
 */
export const someByType = (children, type) => _.some(Children.toArray(children), { type });


/**
 * Get Child Type
 * @param {Object} children React Children Props
 * @param {string|Function} type An HTML Tag name or a React Component
 * @return {undefined|Object}
 */
export const findByType = (children, type) => _.find(Children.toArray(children), { type });


/**
 * Test if children list is nil
 * @param {Object} children React Children Props
 * @return {Boolean}
 */
export const isNil = children => children === null
  || children === undefined
  || (Array.isArray(children) && children.length === 0);
