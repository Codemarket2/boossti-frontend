import { useSelector } from 'react-redux';

export const useAuthorization = (_id: string[], allowAdmin: boolean) => {
  const { attributes, admin = false } = useSelector(({ auth }: any) => auth);

  let allow = false;
  allow = _id?.includes(attributes['custom:_id']);
  return allow || (allowAdmin && admin);
};
