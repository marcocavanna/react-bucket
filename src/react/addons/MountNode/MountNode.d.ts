import * as React from 'react'

export interface MountNodeProps extends StrictMountNodeProps {
  [key: string]: any
}

export interface StrictMountNodeProps {

  /** User defined class */
  className?: string,

  /** The DOM node where will apply class names, default to document.body */
  node?: HTMLElement | React.Ref<any>

}

declare class MountNode extends React.Component<MountNodeProps, {}> { }

export default MountNode
