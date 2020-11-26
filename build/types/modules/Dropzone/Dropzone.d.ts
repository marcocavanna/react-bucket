import * as React from 'react';
import processFileUpload from './lib/processFileUpload';
import { DropzoneFile, DropzoneProps } from './Dropzone.types';
interface DropzoneState {
  /** Dropzone files list */
  files: DropzoneFile[];
  /** Dropzone upload has error */
  hasUploadError: boolean;
  /** Dropzone is currently uploading files */
  isUploading: boolean;
}
export default class Dropzone extends React.Component<
  DropzoneProps,
  DropzoneState
> {
  static processFileUpload: typeof processFileUpload;
  static displayName: string;
  static defaultProps: Partial<DropzoneProps>;
  state: DropzoneState;
  private handleDropFiles;
  private handleRemoveFiles;
  private handleClearFiles;
  private handleDeleteFile;
  private handleEditFile;
  private handleSetFilesState;
  private handleUploadFiles;
  private renderDropzone;
  render(): JSX.Element;
}
export {};
