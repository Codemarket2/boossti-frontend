import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../graphql/mutation/post';
import { useGetInUseLists } from '../list';

interface IProps {
  onAlert: (arg1: string, arg2: string) => {};
  onSuccess: () => {};
}

export function useCreatePost({ onAlert, onSuccess }) {
  const { data, loading, error } = useGetInUseLists();
  const [state, setState] = useState({
    value: '',
    output: '',
    showMenu: null,
    selectedTag: null,
    showTagModel: false,
    selectedList: { items: [] },
    showSubList: false,
    createPostLoading: false,
  });
  const [createPostMutation] = useMutation(CREATE_POST);

  const onSave = async () => {
    if (state.value === '') {
      return onAlert('Error', 'Enter some text');
    }
    try {
      setState({
        ...state,
        createPostLoading: true,
      });
      await createPostMutation({
        variables: {
          body: state.value,
        },
      });
      // setState({
      //   ...state,
      //   value: '',
      //   createPostLoading: false,
      // });
      // onAlert('Success', 'Post created successfully');
      onSuccess();
    } catch (error) {
      onAlert('Error', error.message);
      setState({
        ...state,
        createPostLoading: false,
      });
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
  };
}
