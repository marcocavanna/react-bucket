import _ from 'lodash';
import { isBrowser } from '@appbuckets/rabbit';

import { isRefObject, toRefObject } from '../../Ref';

const getNodeRefFromProps = (props) => {
  const { node } = props;

  if (!isBrowser()) {
    return null;
  }

  if (isRefObject(node)) {
    return node;
  }

  return _.isNil(node) ? toRefObject(document.body) : toRefObject(node);
};

export default getNodeRefFromProps;
