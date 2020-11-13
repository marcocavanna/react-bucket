import * as React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Icon } from './index';
import { Box } from '../Box';

import { getBackgroundColor, getElementSize } from '../../stories';

import * as Grid from '../../collections/Grid';

import fontAwesomeMapper from '../../lib/fontAwesomeMapper';
import { FontAwesomeIcon } from '../../fontawesome';


export default { title: 'Elements/Icon', component: Icon };


/* --------
 * Stories
 * -------- */
export const allIcon = () => {

  return (
    <Grid.Row>
      {Object.keys(fontAwesomeMapper).map(name => (
        <Grid.Column
          key={name}
          width={{
            phoneUp  : 12,
            tabletUp : 6,
            desktopUp: 4
          }}
          content={(
            <Box px={4} py={6} textAlign={'center'} m={4} backgroundColor={'white shade'}>
              <Icon
                unspaced
                name={name as FontAwesomeIcon}
                size={'big'}
              />
              <p className={'has-font-semi-bold mt-4'}>{name}</p>
            </Box>
          )}
        />
      ))}
    </Grid.Row>
  );
};


export const iconVariation = () => {

  const clickable = boolean('Clickable', false);
  const bordered = boolean('Bordered', false);
  const disabled = boolean('Disabled', false);
  const spin = boolean('Spin', false);
  const solid = select(
    'Solid',
    [ 'none', 'circle', 'rounded', 'colored circle', 'colored rounded', 'inverted circle', 'inverted rounded' ],
    'none'
  ) as 'circle' | 'rounded' | 'colored circle' | 'colored rounded' | 'inverted circle' | 'inverted rounded';
  const rotate = select(
    'Rotate',
    [ '0', '90', '180', '270' ],
    '0'
  ) as '90' | '180' | '270';
  const flip = select(
    'Flip',
    [ 'none', 'vertical', 'horizontal', 'both' ],
    'none'
  ) as 'vertical' | 'horizontal' | 'both';

  const appearance = getBackgroundColor('primary');
  const size = getElementSize('huge');

  return (
    <Grid.Row columnsAlign={'centered'}>
      <Grid.Column width={6}>
        <Box p={6} textAlign={'center'} backgroundColor={'white shade'}>
          <Icon
            unspaced
            onClick={clickable ? action('Clicked') : undefined}
            appearance={appearance}
            bordered={bordered}
            disabled={disabled}
            size={size}
            solid={solid}
            spin={spin}
            rotate={rotate}
            flip={flip}
            name={'box open'}
          />
        </Box>
      </Grid.Column>
    </Grid.Row>
  );
};
