import _ from 'lodash';

const sharedProps = {
  as: {
    type    : 'Any',
    comment : 'An element used to render'
  },

  children: {
    type    : 'React Element',
    comment : 'Component Children Node'
  }
};

const getSharedProps = (...props) => _.pick(sharedProps, ...props);

export default getSharedProps;
