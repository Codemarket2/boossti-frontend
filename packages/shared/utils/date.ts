import moment from 'moment';

export const getCreatedAtDate = (createdAt) => {
  return moment(createdAt) > moment().subtract(7, 'days')
    ? moment(createdAt).fromNow()
    : moment(createdAt).format('LL');
};
