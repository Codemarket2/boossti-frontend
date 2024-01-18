// SHARED
import { useGetForms } from '@frontend/shared/hooks/form';

/** Retrives the List of all forms */
const useGetFormList = () => {
  const { data, error, loading } = useGetForms({
    page: 1,
    limit: 5,
  });

  return [data, error, loading];
};

export type TFormListData = ReturnType<typeof useGetForms>['data'];

export default useGetFormList;
