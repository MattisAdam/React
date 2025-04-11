import { identity, isObject, pickBy, set, toPairs } from 'lodash'
import { castDateAsParam } from './dateHelper';
  
export const castObjectAsParam = <T extends object>(value: T): any => {
 
    const params = pickBy(value, identity);
 
    for (const [key, val] of toPairs(params)) {
        if (val instanceof Date) {
            set(params, key, castDateAsParam(val));
        } else if (Array.isArray(val)) {  
            const updatedArray = val.map(item => isObject(item) ? castObjectAsParam(item) : item);
            set(params, key, updatedArray);
        } else if (isObject(val)) {
            set(params, key, castObjectAsParam(val));
        }
    }
 
    return params;
};