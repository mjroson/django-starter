import moment from 'moment';
import { formatDateToRender } from './contants';

export const displayDate = date => {
  if (date !== null) {
    return moment(date).format(formatDateToRender);
  }
};

export const displayPrice = amount =>
  Number(amount).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });
