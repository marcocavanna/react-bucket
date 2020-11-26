import { MinimalReactBucketComponentProps } from '../../../generic';
import { StrictSharedProgressProps } from '../Shared.types';
export declare type ProgressDescriptor = {
  max: number;
  min: number;
  overvalued: boolean;
  percentage: number;
  rawMax: number;
  rawValue: number;
  width: number;
  value: number;
};
export interface ProgressProps<P> {
  className: string;
  progress: ProgressDescriptor;
  rest: Omit<P, keyof StrictSharedProgressProps | 'className'>;
}
declare type ExtendedSharedProgressProps = MinimalReactBucketComponentProps<
  StrictSharedProgressProps
>;
export default function useProgressProps<P extends ExtendedSharedProgressProps>(
  props: P
): ProgressProps<P>;
export {};
