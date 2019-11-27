import * as React from 'react'

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

  /** Tools Array */
  tools?: ButtonProps[]
}

interface HeroToolsComponent extends React.StatelessComponent<HeroToolsProps> { }

declare const HeroTools: HeroToolsComponent

export default HeroTools
