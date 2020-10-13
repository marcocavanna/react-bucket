import {
  ReactBucketComponentProps
} from '../../generic';


export interface TabPanelProps extends ReactBucketComponentProps<StrictTabPanelProps> {
}

export interface StrictTabPanelProps {
  /** Set if tab is active */
  active?: boolean;
}
