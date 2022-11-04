import moment from 'moment';

export const getCreatedAtDate = (createdAt, maxDate = 7, format = 'lll') => {
  return moment(createdAt) > moment().subtract(maxDate, 'days')
    ? moment(createdAt).fromNow()
    : moment(createdAt).format(format);
};
