import * as React from 'react'

export interface ImageProps extends StrictImageProps {
  [key: string]: any
}

export interface StrictImageProps {
  /** An element used to render */
  as?: any

  /** Define if image is avatar style */
  avatar?: boolean

  /** Define if image is Bordered */
  bordered?: boolean

  /** Children Node */
  children?: React.ReactNode

  /** Define if image is Circular */
  circular?: boolean

  /** User defined class */
  className?: string

  /** Content Shorthand */
  content?: React.ReactNode

  /** Dimmer Shorthand */
  dimmer?: any

  /** Show image as disabled */
  disabled?: boolean

  /** Show image full width */
  full?: boolean

  /** Render the Image as a Tag */
  href?: string

  /** Show image as Inline Block */
  inline?: boolean

  /** Add Label */
  label?: any

  /** Round Corners */
  rounded?: boolean

  /** Add Space on left/right */
  spaced?: boolean | 'left' | 'right'

  /** Wrap Image */
  wrapped?: boolean

}

interface ImageComponent extends React.StatelessComponent<ImageProps> { }

declare const Image: ImageComponent

export default Image
