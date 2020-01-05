import moment from 'moment';
import { formatDateToParser } from './contants';

export const CustomDateParam = {
  encode: date => date.format(formatDateToParser),
  decode: input => moment(input).format(formatDateToParser)
};

export const DateRangeParam = {
  encode: values => {
    return values.map(value => value.format(formatDateToParser));
  },
  decode: values =>
    values.map(value => moment(value).format(formatDateToParser))
};
