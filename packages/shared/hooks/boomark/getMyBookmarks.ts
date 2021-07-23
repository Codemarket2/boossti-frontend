import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_BOOKMARKS } from '../../graphql/query/bookmark';
import { DELETE_BOOKMARK } from '../../graphql/mutation/bookmark';

interface IProps {
  onAlert: (arg1: string, arg2: string) => void;
}

export function useGetMyBookmarks({ onAlert }: IProps) {
  const [state, setState] = useState({
    limit: 50,
    page: 1,
    search: '',
    showMenu: null,
    selectedBookmark: null,
    showSearch: false,
  });
  const res = useQuery(GET_MY_BOOKMARKS, {
    variables: { limit: state.limit, page: state.page, search: state.search },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteBookmarkMutation, { loading: deleteBookmarkLoading }] = useMutation(DELETE_BOOKMARK);

  const updateCache = (client) => {
    const { getMyBookmarks } = client.readQuery({
      query: GET_MY_BOOKMARKS,
      variables: { limit: state.limit, page: state.page, search: state.search },
    });

    const newData = {
      getMyBookmarks: {
        ...getMyBookmarks,
        data: getMyBookmarks.data.filter((b) => b._id !== state.selectedBookmark._id),
      },
    };

    client.writeQuery({
      query: GET_MY_BOOKMARKS,
      variables: { limit: state.limit, page: state.page, search: state.search },
      data: newData,
    });
  };

  const handleDeleteBookmark = async () => {
    try {
      await deleteBookmarkMutation({
        variables: {
          _id: state.selectedBookmark._id,
        },
        update: updateCache,
      });
      setState({ ...state, showMenu: null, selectedBookmark: null });
    } catch (error) {
      onAlert('Error', error.message);
    }
  };
  return { ...res, state, setState, handleDeleteBookmark, deleteBookmarkLoading };
}
