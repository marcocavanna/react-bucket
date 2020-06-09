import '../src/styles/index.scss';
import './stories.scss';

import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';


addDecorator(withKnobs());
