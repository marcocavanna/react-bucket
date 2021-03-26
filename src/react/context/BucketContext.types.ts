import { DayPickerProps } from '../elements/DayPicker';

/* --------
 * Bucket Theme Provider
 * -------- */
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P]
};

export interface ThemeOptions {
  dayPicker: Partial<DayPickerProps<any>>;
}

export type PartialThemeOptions = RecursivePartial<ThemeOptions>;


/* --------
 * The Bucket Context will contain the theme object and some useful functions
 * -------- */
export interface BucketThemeContext {
  /** Theme configuration */
  theme: ThemeOptions;
}
