import * as React from 'react';

import { Avatar } from './index';


export default { title: 'Elements/Avatar', component: Avatar };

export const baseAvatar = () => {
  return (
    <Avatar
      badge={{ name: 'mail bulk' }}
      icon={'briefcase'}
    />
  );
};
