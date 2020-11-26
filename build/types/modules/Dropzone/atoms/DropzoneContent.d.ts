import * as React from 'react';
export interface DropzoneContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Children Shorthand */
  content?: React.ReactNode;
}
declare const DropzoneContent: React.FunctionComponent<DropzoneContentProps>;
export default DropzoneContent;
