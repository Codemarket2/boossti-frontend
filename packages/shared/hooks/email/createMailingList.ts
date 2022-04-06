import { useMutation, useQuery } from '@apollo/client';
import { CREATE_MAILING_LIST_FROM_CONTACT } from '../../graphql/mutation/contact';
import { CREATE_MAILING_LIST } from '../../graphql/mutation/email';
import { GET_ALL_MAILING_LIST } from '../../graphql/query/contact';

export function useCreateMailingList() {
  const [createMutation, { loading: createLoading }] = useMutation(CREATE_MAILING_LIST);

  const handleCreateList = async (payload: any) => {
    try {
      const res = await createMutation({
        variables: payload,
      });
      return res;
    } catch (error) {
      // console.log(error);
      return error;
    }
  };
  return { handleCreateList, createLoading };
}

export const useGetAllMailingList = () => {
  const { data, error, loading } = useQuery(GET_ALL_MAILING_LIST, {
    fetchPolicy: 'cache-and-network',
  });
  const mailingList = data?.getAllMailingList;

  return {
    mailingList,
    error,
    loading,
  };
};

export function useCreateMailingListFromContact() {
  const [createMutation, { loading: createLoading }] = useMutation(
    CREATE_MAILING_LIST_FROM_CONTACT,
  );
  const handleCreateMailingList = async (payload: any) => {
    try {
      const res = await createMutation({
        variables: payload,
      });
      return res;
    } catch (error) {
      // console.log(error);
      return error;
    }
  };
  return { handleCreateMailingList, createLoading };
}
