export interface SimpleFetchOptions {
  /** Define if request should return JSON, default `true` */
  json?: boolean;
  /** Set the Method */
  method?: string;
}
export default function simpleFetch<P extends any = any>(
  url: string,
  options?: SimpleFetchOptions
): Promise<P>;
