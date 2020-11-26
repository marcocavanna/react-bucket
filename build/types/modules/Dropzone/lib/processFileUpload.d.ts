import {
  DropzoneFile,
  DropzoneHelpers,
  DropzoneProps,
} from '../Dropzone.types';
export declare type ProcessFileHandler = (
  file: DropzoneFile,
  helpers: DropzoneHelpers
) => Promise<void>;
export interface ProcessFileUploadConfig {
  /** Set if must auto control file state */
  autoControlFileState?: boolean;
  /** Auto remove file timeout */
  autoRemoveUploadedTimeout?: number;
  /** Set concurrency upload */
  concurrency?: number;
  /** Handler to call on single file upload end */
  onFileUploadEnd?: (file: DropzoneFile, helpers: DropzoneHelpers) => void;
  /** On file upload error handler */
  onFileUploadError?: (file: DropzoneFile, helpers: DropzoneHelpers) => void;
}
export default function processFileUpload(
  handler: ProcessFileHandler,
  config?: ProcessFileUploadConfig
): DropzoneProps['onUpload'];
