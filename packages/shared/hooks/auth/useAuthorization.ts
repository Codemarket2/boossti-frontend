import { useSelector } from 'react-redux';

export const useAuthorization = (_id: string[], allowAdmin: boolean) => {
  const { attributes, admin = false } = useSelector(({ auth }: any) => auth);

  if (allowAdmin && admin) {
    return true;
  }
  let allow = false;
  if (attributes['custom:_id']) {
    _id?.forEach((i) => {
      if (i) {
        allow = i === attributes['custom:_id'];
      }
    });
  }
  return allow;
};
