import { useSelector } from 'react-redux';

export const useAuthorization = (_id: string[], allowAdmin = false) => {
  const { attributes, admin = false } = useSelector(({ auth }: any) => auth);

  if (allowAdmin && admin) {
    return true;
  }
  let allow = false;
  if (attributes['custom:_id']) {
    allow = _id?.some((i) => {
      if (i) {
        return i === attributes['custom:_id'];
      }
      return false;
    });
  }
  return allow;
};
