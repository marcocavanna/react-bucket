import { MinimalReactBucketComponentProps } from '../../generic';

import { LoaderProps } from '../../elements/Loader';


export interface BackdropProps extends MinimalReactBucketComponentProps<StrictBackdropProps> {
}

export interface StrictBackdropProps {
  /** Set a Loader as Backdrop Inner Content */
  loading?: boolean;

  /** Manually override Loader Props */
  loaderProps?: LoaderProps;

  /** Set the backdrop as full page */
  page?: boolean;

  /** Set the backdrop and its content as visible */
  visible?: boolean;
}
