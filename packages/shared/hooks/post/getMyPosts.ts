import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MY_POSTS } from '../../graphql/query/post';
import { DELETE_POST } from '../../graphql/mutation/post';
import { IHooksProps } from '../../types/common';

export function useGetMyPosts({ onAlert }: IHooksProps) {
  const [state, setState] = useState({
    limit: 20,
    page: 1,
    search: '',
    showMenu: null,
    selectedPost: null,
    showEditModal: false,
  });
  const res = useQuery(GET_MY_POSTS, {
    variables: { limit: state.limit, page: state.page, search: state.search },
    fetchPolicy: 'cache-and-network',
  });
  const [deletePostMutation, { loading: deletePostLoading }] = useMutation(DELETE_POST);

  const updateCache = (client) => {
    const { getMyPosts } = client.readQuery({
      query: GET_MY_POSTS,
      variables: { limit: state.limit, page: state.page, search: state.search },
    });
    const newData = {
      getMyPosts: {
        ...getMyPosts,
        data: getMyPosts.data.filter((b) => b._id !== state.selectedPost._id),
      },
    };
    client.writeQuery({
      query: GET_MY_POSTS,
      variables: { limit: state.limit, page: state.page, search: state.search },
      data: newData,
    });
  };

  const handleDeletePost = async () => {
    try {
      await deletePostMutation({
        variables: {
          _id: state.selectedPost._id,
        },
        update: updateCache,
      });
      setState({ ...state, showMenu: null, selectedPost: null });
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { ...res, state, setState, handleDeletePost, deletePostLoading };
}
