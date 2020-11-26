import * as React from 'react';
import { AutoSpacerProps } from './AutoSpacer.types';
interface AutoSpacerState {
  /** Current Height */
  height: number;
  /** Current Width */
  width: number;
}
export default class AutoSpacer extends React.Component<
  AutoSpacerProps,
  AutoSpacerState
> {
  state: AutoSpacerState;
  isComponentMounted: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  parentNode: (Node & ParentNode) | undefined | null;
  componentDidMount(): void;
  componentWillUnmount(): void;
  computeHeight(initialHeight: number): number;
  computeWidth(initialWidth: number): number;
  recomputeSizing(): void;
  renderChildren(): React.ReactNode | null;
  render(): JSX.Element;
}
export {};
