import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_MY_RESPONSES } from '../../graphql/query/response';
import { RESPONSE_SUB } from '../../graphql/subscription/response';

export const defaultQueryVariables = { page: 1, limit: 10, search: '' };

export function useGetMyResponses() {
  const [subsribed, setSubsribed] = useState(false);
  const [state, setState] = useState({
    page: defaultQueryVariables.page,
    limit: defaultQueryVariables.limit,
    search: '',
    showSearch: false,
  });

  const { data, error, loading, subscribeToMore } = useQuery(GET_MY_RESPONSES, {
    variables: { ...state },
    fetchPolicy: 'cache-and-network',
  });

  // useEffect(() => {
  //   if (!subsribed) {
  //     setSubsribed(true);
  //     subscribeToMore({
  //       document: RESPONSE_SUB,
  //       variables: {
  //         userId,
  //       },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         const newItem = subscriptionData.data.responseSub;
  //         let isNew = true;
  //         let newData = prev?.getMyResponses?.data?.map((t) => {
  //           if (t._id === newItem._id) {
  //             isNew = false;
  //             return newItem;
  //           }
  //           return t;
  //         });
  //         if (isNew) {
  //           newData = [...prev?.getMyResponses?.data, newItem];
  //         }
  //         return {
  //           ...prev,
  //           getMyResponses: {
  //             ...prev.getMyResponses,
  //             data: newData,
  //           },
  //         };
  //       },
  //     });
  //   }
  // }, []);

  return { data, error, loading, state, setState };
}
