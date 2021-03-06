import { IconProps } from '../../elements/Icon';
import {
  ReactBucketComponentProps, ReactBucketIcon,
  ShorthandItem
} from '../../generic';

import { HeaderProps } from '../../elements/Header';

import { CollapsableProps } from '../../modules/Collapsable';


export interface AccordionSection extends Omit<CollapsableProps, 'trigger'> {
  trigger?: ShorthandItem<HeaderProps>;
}

export interface AccordionsProps extends ReactBucketComponentProps<StrictAccordionsProps> {
}

export interface StrictAccordionsProps {
  /** Set the tab active index */
  activeIndexes?: number[];

  /** Allow Multiple Opening */
  allowMultiple?: boolean;

  /** Avoid declared children */
  children?: never;

  /** Set the default active index */
  defaultActiveIndexes?: number[];

  /** Set Trigger Icon */
  icon?: ReactBucketIcon<IconProps>;

  /** Icon Rotation while Active */
  iconRotation?: number;

  /** On Section Change Shorthand */
  onSectionChange?: (action: 'open' | 'close', props: AccordionsProps) => void;

  /** On Section Close Event */
  onSectionClose?: (nothing: null, props: AccordionsProps) => void;

  /** On Section Open Event */
  onSectionOpen?: (nothing: null, props: AccordionsProps) => void;

  /** Accordion Sections */
  sections?: AccordionSection[];
}
