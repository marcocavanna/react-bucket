import * as React from 'react';
import DropdownMenu from './DropdownMenu';
import { Button } from '../../elements/Button';


export default { title: 'Collections/DropdownMenu' };


export const dropdown = () => {
  return (
    <DropdownMenu
      trigger={(
        <Button content={'Menu'} />
      )}
      items={[
        { key: 0, content: 'Vox 1', icon: 'plus' },
        { key: 1, content: 'Vox 2', icon: 'edit', disabled: true },
        { key: 2, content: 'Vox 3', icon: 'trash', appearance: 'danger' }
      ]}
    />
  );
};
