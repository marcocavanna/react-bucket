declare function toRefObject<T extends Node | Window>(node: T): React.RefObject<T>;

export default toRefObject;
