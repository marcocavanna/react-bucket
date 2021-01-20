import * as React from 'react';
import Accordions from './Accordions';


export default { title: 'Collections/Accordions' };

export const accordions = () => (
  <Accordions
    sections={[
      {
        trigger: {
          content: 'Accordion 1',
          icon   : {
            name   : 'check',
            success: true
          }
        },
        content: 'Accordion 1 Content'
      },
      {
        trigger: {
          content: 'Accordion 1',
          icon   : {
            name   : 'check',
            success: true
          }
        },
        content: 'Accordion 2 Content'
      },
      {
        trigger: {
          content: 'Accordion 1',
          icon   : {
            name  : 'times',
            danger: true
          }
        },
        content: 'Accordion 3 Content'
      }
    ]}
  />
);
