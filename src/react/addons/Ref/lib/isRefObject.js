import { isObject } from '@appbuckets/rabbit';

const isRefObject = ref => isObject(ref) && Object.getOwnPropertyNames(ref).includes('current');

export default isRefObject;
