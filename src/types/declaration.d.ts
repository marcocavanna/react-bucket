declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'sort-by' {
  declare function sortBy<Data>(...fields: string[]): (a: Data, b: Data) => number;

  export default sortBy;
}
