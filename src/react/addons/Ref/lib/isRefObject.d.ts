import * as React from 'react';

declare function isRefObject(ref: any): ref is React.RefObject<any>;

export default isRefObject
