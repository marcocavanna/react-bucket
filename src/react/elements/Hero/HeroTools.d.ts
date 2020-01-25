import * as React from 'react'

import { ReactBucketShorthandCollection } from '../../generic';

import { ButtonProps } from '../Button';

export interface HeroToolsProps extends StrictHeroToolsProps {
  [key: string]: any
}

export interface StrictHeroToolsProps {
  /** An element used to render */
  as?: React.ElementType

  /** Children Node */
  children?: React.ReactNode

  /** User defined class */
  className?: string

  /** Hide or Show the Page Hero Tools */
  includeHeroPageTools?: boolean

  /** Tools Array */
  tools?: ReactBucketShorthandCollection<ButtonProps>
}

declare const HeroTools: React.FunctionComponent<HeroToolsProps>

export default HeroTools
