import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import USER_MUTATION from '../../graphql/mutation/user';
import { GET_USER, GET_USERS } from '../../graphql/query/user';
import { userSubscriptionData } from '../../redux/actions/auth';

export function useInitialUser() {
  const dispatch = useDispatch();
  const { data } = useQuery(USER_QUERY.GET_ONE, {
    variables: { userId: 'vivekvt' },
  });

  useEffect(() => {
    if (data && data.getUserByCognitoUserId) {
      dispatch(userSubscriptionData(data.getUserByCognitoUserId));
    }
  }, [data]);
}

export function useGetOneUser({ _id }: any) {
  const data = useQuery(GET_USER, { variables: { _id: _id } });
  console.log('useGetOneUser', data.data, data.error);
  return data;
}

export function useGetAllUser() {
  // { lowerRange, higherRange, active }
  const [updateUserStatusMutation] = useMutation(USER_MUTATION.UPDATE_STATUS);
  const [filter, setFilter] = useState({
    active: null,
    block: false,
    limit: 20,
    page: 1,
    search: '',
    sortBy: '-createdAt',
    lowerRange: null,
    higherRange: null,
  });

  const { loading, data, error } = useQuery(GET_USERS, {
    variables: {
      ...filter,
      // lowerRange,
      // higherRange,
      // active,
    },
    fetchPolicy: 'network-only', // 'cache-and-network' //'network-only'
  });

  // console.log('Error', data, error);

  const [allData, setAllData] = useState({
    count: 0,
    users: [],
  });

  const adminId = useSelector(({ auth }: any) => (auth.authenticated ? auth.attributes.sub : null));

  useEffect(() => {
    if (data && data.getUsers) {
      if (filter.page > 1) {
        setAllData({ ...allData, users: [...allData.users, ...data.getUsers.users] });
      } else {
        setAllData(data.getUsers);
      }
    }
  }, [data]);

  const handleUpdateUserStatus = async (userId: string, status: boolean) => {
    await updateUserStatusMutation({
      variables: {
        userId,
        status,
        updatedBy: adminId,
      },
    });
    setAllData({
      ...allData,
      users: allData.users.map((u) => (u.userId === userId ? { ...u, active: status } : u)),
    });
  };

  return { filter, setFilter, allData, loading, handleUpdateUserStatus };
}
