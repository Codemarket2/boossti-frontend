import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST } from '../../graphql/mutation/post';
import { useGetInUseLists } from '../list';
import { GET_MY_POSTS } from '../../graphql/query/post';
import { fileUpload } from '../../utils/fileUpload';

interface IProps {
  onAlert: (arg1: string, arg2: string) => void;
  onSuccess: () => void;
  edit?: boolean;
  post?: any;
}

const defaultPost = {
  _id: '',
  body: '',
  images: [],
  edit: false,
};

export function useCreatePost({ onAlert, onSuccess, edit = false, post = defaultPost }: IProps) {
  const { data, loading, error } = useGetInUseLists();
  const [state, setState] = useState({
    _id: '',
    body: '',
    images: [],
    output: '',
    showMenu: null,
    selectedTag: null,
    showTagModel: false,
    selectedList: { items: [] },
    showSubList: false,
    submitLoading: false,
    tempImages: [],
    tempImagesURL: [],
    ...post,
    edit,
  });
  const [createPostMutation] = useMutation(CREATE_POST);
  const [updatePostMutation] = useMutation(UPDATE_POST);

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
        data: getMyPosts.data.map((p) => (p._id === state._id ? { ...p, body: state.body } : p)),
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
      if (state.body === '') {
        return onAlert('Error', 'Enter some text');
      }
      let newImages = [];
      if (state.tempImages.length > 0) {
        newImages = await fileUpload(state.tempImages, '/posts');
      }
      let images = [...state.images, ...newImages];
      if (edit) {
        await updatePostMutation({
          variables: {
            _id: state._id,
            body: state.body,
            images,
          },
          update: updateCache,
        });
      } else {
        const res = await createPostMutation({
          variables: {
            body: state.body,
            images,
          },
        });
      }
      setState({
        ...state,
        submitLoading: false,
        body: '',
        tempImages: [],
        tempImagesURL: [],
        images: [],
      });
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
      body: state.body + ` @@@__${_id}^^__${name}@@@^^^`,
      showTagModel: false,
    });
  };

  const handleChange = ({ target }: any) => {
    target.value = target.value.split('@@@^^^@@@__').join('@@@^^^ @@@__');
    return setState({ ...state, body: target.value, showSubList: false });
  };

  const onAdd = (id, display, startPos, endPos) => {
    if (!state.showSubList) {
      let textBeforeCursorPosition = state.body.substring(0, startPos);
      let textAfterCursorPosition = state.body.substring(startPos, endPos - 1);
      let newString =
        textBeforeCursorPosition + `@@@__${id}^^__${display}@@@^^^@` + textAfterCursorPosition;
      const selectedList = data.getLists.data.filter((list) => list._id === id)[0];
      setState({
        ...state,
        body: newString,
        selectedList,
        showSubList: true,
      });
    }
  };

  const handleFileChange = (event) => {
    let newArray = [...state.tempImagesURL];
    for (let i = 0; i < event.target.files.length; i++) {
      newArray.push(URL.createObjectURL(event.target.files[i]));
    }
    setState({
      ...state,
      tempImages: [...state.tempImages, ...event.target.files],
      tempImagesURL: newArray,
    });
  };

  const handleRemoveImage = (index: number) => {
    let urlArray = [...state.images];
    urlArray.splice(index, 1);
    setState({ ...state, images: urlArray });
  };

  const handleRemoveTempImage = (index: number) => {
    let fileArray = [...state.tempImages];
    let urlArray = [...state.tempImagesURL];
    fileArray.splice(index, 1);
    urlArray.splice(index, 1);
    setState({ ...state, tempImagesURL: urlArray, tempImages: fileArray });
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
    handleFileChange,
    handleRemoveTempImage,
    handleRemoveImage,
  };
}
