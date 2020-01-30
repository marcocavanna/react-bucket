import * as React from 'react'

export interface IDroppedFiles {
  /** The File Blob */
  blob: File

  /** If there was error while reading file */
  error: boolean

  /** Image Height */
  height: number

  /** Image icon preview */
  icon: string

  /** A random generated ID */
  id: string

  /** Check if a file is an Image */
  isImage: boolean

  /** The file original name */
  name: string

  /** Image file preview as base64 string */
  preview: string

  /** The file size */
  size: number

  /** File mimetype */
  type: string

  /** Image width */
  width: number
}

declare interface DropzoneEventProps extends DropzoneProps {
  files: IDroppedFiles[]
  value: IDroppedFiles[]
}

export interface DropzoneProps extends StrictDropzoneProps {
  [key: string]: any
}

export interface StrictDropzoneProps {
  /** An element used to render */
  as?: any,

  /** User defined class */
  className?: string,

  /** Disable the Component */
  disabled?: boolean,

  /** Allow multiple file drop */
  multiple?: boolean

  /** Avoid Click event */
  noClick?: boolean

  /** Avoid Drag Event */
  noDrag?: boolean

  /** On Drop function will be invoked instead setting component state */
  onDrop?: (err: any, files: IDroppedFiles[]) => void

  /** After Drop is Completed the onDropEnd will be invoked */
  onDropEnd?: (err: any, files: IDroppedFiles[]) => void

  /** Every Time a file change, onFileChanged will be invoked */
  onFileChange?: (nothing: null, props: DropzoneEventProps) => void

  /** Show Upload interface and add an Handler to Upload file */
  onUpload?: (files: IDroppedFiles[], controller: any) => Promise<void>

  /** Called once upload is finish */
  onUploadEnd?: (files: IDroppedFiles[]) => void

  /** Change the Choosen File View */
  showFilesAs?: 'icon' | 'list'

  /** Hide the Component, without Unmount */
  visible?: boolean
}

interface DropzoneComponent extends React.StatelessComponent<DropzoneProps> { }

declare const Dropzone: DropzoneComponent

export default Dropzone
