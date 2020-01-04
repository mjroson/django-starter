import moment from 'moment';

export const CustomDateParam = {
  encode: date => date.format('YYYY-MM-DD'),
  decode: input => input
};

export const normalizeDatePikerValue = value => {
  if (typeof value === 'string') {
    return moment(value);
  }
};
