import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST } from '../../graphql/mutation/post';
import { useGetInUseLists } from '../list';
import { GET_MY_POSTS } from '../../graphql/query/post';

interface IProps {
  onAlert: (arg1: string, arg2: string) => void;
  onSuccess: () => void;
  edit?: boolean;
  post?: any;
}

const defaultPost = {
  _id: '',
  edit: false,
  body: false,
};

export function useCreatePost({ onAlert, onSuccess, edit = false, post = defaultPost }: IProps) {
  const { data, loading, error } = useGetInUseLists();
  const [state, setState] = useState({
    _id: '',
    value: '',
    output: '',
    showMenu: null,
    selectedTag: null,
    showTagModel: false,
    selectedList: { items: [] },
    showSubList: false,
    edit,
    ...post,
    submitLoading: false,
  });
  const [createPostMutation, { loading: createPostLoading }] = useMutation(CREATE_POST);
  const [updatePostMutation, { loading: updatePostLoading }] = useMutation(UPDATE_POST);

  useEffect(() => {
    if (edit) {
      setState({
        ...state,
        edit,
        ...post,
      });
    }
  }, [edit]);

  const updateCache = (client) => {
    const { getMyPosts } = client.readQuery({
      query: GET_MY_POSTS,
      variables: { limit: 20, page: 1, search: '' },
    });
    const newData = {
      getMyPosts: {
        ...getMyPosts,
        data: getMyPosts.data.map((p) => (p._id === state._id ? { ...p, body: state.value } : p)),
      },
    };
    client.writeQuery({
      query: GET_MY_POSTS,
      variables: { limit: 20, page: 1, search: '' },
      data: newData,
    });
  };

  const onSave = async () => {
    try {
      if (state.value === '') {
        return onAlert('Error', 'Enter some text');
      }
      setState({ ...state, submitLoading: true });
      if (edit) {
        await updatePostMutation({
          variables: {
            _id: state._id,
            body: state.value,
          },
          update: updateCache,
        });
      } else {
        const res = await createPostMutation({
          variables: {
            body: state.value,
          },
        });
        console.log('createPostMutation res', res);
      }
      setState({ ...state, value: '', submitLoading: false });
      onSuccess();
    } catch (error) {
      setState({ ...state, submitLoading: false });
      onAlert('Error', error.message);
    }
  };

  const handleOpenTagModel = (list) => {
    setState({ ...state, showTagModel: true, selectedList: list });
  };

  const handleSelectTag = (_id, name) => {
    setState({
      ...state,
      value: state.value + ` @@@__${_id}^^__${name}@@@^^^`,
      showTagModel: false,
    });
  };

  const handleChange = ({ target }: any) => {
    target.value = target.value.split('@@@^^^@@@__').join('@@@^^^ @@@__');
    return setState({ ...state, value: target.value, showSubList: false });
  };

  const onAdd = (id, display, startPos, endPos) => {
    if (!state.showSubList) {
      let textBeforeCursorPosition = state.value.substring(0, startPos);
      let textAfterCursorPosition = state.value.substring(startPos, endPos - 1);
      let newString =
        textBeforeCursorPosition + `@@@__${id}^^__${display}@@@^^^@` + textAfterCursorPosition;
      const selectedList = data.getLists.data.filter((list) => list._id === id)[0];
      setState({
        ...state,
        value: newString,
        selectedList,
        showSubList: true,
      });
    }
  };

  const suggestions = state.showSubList
    ? state.selectedList.items.map((item) => ({ id: item._id, display: item.title }))
    : data && data.getLists
    ? data.getLists.data.map((list) => ({ id: list._id, display: list.name }))
    : [];

  return {
    state,
    setState,
    data,
    loading,
    error,
    suggestions,
    onAdd,
    handleChange,
    handleSelectTag,
    handleOpenTagModel,
    onSave,
    saveLoading: createPostLoading || updatePostLoading,
  };
}
