export declare type UseTabIndexConfig = {
  /** The current disabled state of component */
  disabled?: boolean;
  /** The user defined tabIndex prop */
  prop?: number | undefined;
  /** The current readOnly state of component */
  readOnly?: boolean;
};
export declare function useTabIndex(
  config: UseTabIndexConfig
): number | undefined;
