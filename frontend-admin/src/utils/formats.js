import moment from 'moment';

const formatDate = 'DD-MM-YYYY';

export const displayDate = date => {
  if (date !== null) {
    return moment(date).format(formatDate);
  }
};

export const displayPrice = amount =>
  Number(amount).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });
