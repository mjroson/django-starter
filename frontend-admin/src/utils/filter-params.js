import moment from 'moment';
import { formatDateToParser, formatDateToRender } from './contants';

export const CustomDateParam = {
  encode: date => date.format(formatDateToParser),
  decode: input => moment(input).format(formatDateToRender)
};

export const DateRangeParam = {
  encode: values => {
    return values
      ? values.map(value => (value ? value.format(formatDateToParser) : value))
      : values;
  },
  decode: values =>
    values.map(value =>
      value ? moment(value).format(formatDateToParser) : value
    )
};
