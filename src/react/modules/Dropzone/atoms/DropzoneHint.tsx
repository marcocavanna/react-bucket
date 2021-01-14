import * as React from 'react';

import { EmptyContent, EmptyContentProps } from '../../../elements/EmptyContent';
import { IconProps } from '../../../elements/Icon';
import { ReactBucketIcon } from '../../../generic';

import { useDropzone } from '../Dropzone.context';


/* --------
 * Component Interfaces
 * -------- */
export interface DropzoneHintProps extends EmptyContentProps {

}


/* --------
 * Component Definition
 * -------- */
const DropzoneHint: React.FunctionComponent<DropzoneHintProps> = (props) => {
  /** Get the Context */
  const dropzone = useDropzone();

  if (dropzone.files.length) {
    return null;
  }

  // @ts-ignore
  const icon: ReactBucketIcon<IconProps> | undefined = dropzone.state.isDragActive
    ? dropzone.props.iconOnDragging
    : dropzone.props.iconOnIdle;

  return (
    <EmptyContent
      {...props}
      className={'dropzone-hint'}
      icon={icon}
      header={dropzone.props.hintTitle}
      content={dropzone.isDisabled
        ? dropzone.props.hintWhileDisabled
        : dropzone.state.isDragActive
          ? dropzone.props.hintWhileDragging
          : dropzone.props.hintOnIdle}
    />
  );
};

DropzoneHint.displayName = 'DropzoneHint';

export default DropzoneHint;
