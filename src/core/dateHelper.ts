import { isNull, isUndefined } from 'lodash';
import moment from 'moment';
 
export const castDateAsParam = (date: Date | null | undefined): Date => {
    if (isNull(date) || isUndefined(date))
        return moment(new Date(1970, 0, 1)).utc(true).toDate()
 
    return moment(date).startOf('day').utc(true).toDate()
}