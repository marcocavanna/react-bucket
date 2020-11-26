/// <reference types="react" />
import { ProgressIndicator } from '../Shared.types';
import { ProgressDescriptor } from './useProgressProps';
export default function useProgressIndicator(
  indicator: ProgressIndicator,
  progress: ProgressDescriptor
): JSX.Element | null;
