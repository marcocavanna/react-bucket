import { ReactBucketComponentProps } from '../../generic';


export type ContainerWidth = 'phone' | 'tablet' | 'desktop' | 'large-desktop';

export interface ContainerProps extends ReactBucketComponentProps<StrictContainerProps> {
}

export interface StrictContainerProps {
  /** Set the Container Width */
  fixedTo?: ContainerWidth;

  /** Set the Container as Fluid */
  fluid?: boolean;
}
