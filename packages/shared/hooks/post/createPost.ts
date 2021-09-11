import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST } from '../../graphql/mutation/post';
// import { useMentionList } from '../list';
import { GET_MY_POSTS } from '../../graphql/query/post';
import { fileUpload } from '../../utils/fileUpload';
import { omitTypename } from '../../utils/omitTypename';

interface IProps {
  onAlert: (arg1: string, arg2: string) => void;
  onSuccess: () => void;
  post?: any;
}

const defaultPost = {
  _id: '',
  body: '',
  media: [],
  edit: false,
};

export function useCreatePost({ onAlert, onSuccess, post = defaultPost }: IProps) {
  // const { data, loading, error } = useMentionList();
  const [state, setState] = useState({
    edit: false,
    _id: '',
    body: '',
    media: [],
    tempMediaFiles: [],
    tempMedia: [],
    output: '',
    showMenu: null,
    selectedTag: null,
    showTagModel: false,
    selectedList: { items: [] },
    showSubList: false,
    submitLoading: false,
    ...post,
  });
  const [createPostMutation] = useMutation(CREATE_POST);
  const [updatePostMutation] = useMutation(UPDATE_POST);

  useEffect(() => {
    if (post.edit || post.body) {
      setState({
        ...state,
        ...post,
      });
    }
  }, [post]);

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
      let newMedia = [];
      if (state.tempMediaFiles.length > 0) {
        newMedia = await fileUpload(state.tempMediaFiles, '/posts');
      }
      newMedia = newMedia.map((n, i) => ({ url: n, caption: state.tempMedia[i].caption }));
      let media = [...state.media, ...newMedia];
      media = media.map((m) => JSON.parse(JSON.stringify(m), omitTypename));
      if (state.edit) {
        await updatePostMutation({
          variables: {
            _id: state._id,
            body: state.body,
            media,
          },
          update: updateCache,
        });
      } else {
        const res = await createPostMutation({
          variables: {
            body: state.body,
            media,
          },
        });
      }
      setState({
        ...state,
        submitLoading: false,
        body: '',
        tempMediaFiles: [],
        tempMedia: [],
        media: [],
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

  const handleChange = (value: string) => {
    return setState({ ...state, body: value });
  };

  return {
    state,
    setState,
    // data,
    // loading,
    // error,
    handleChange,
    handleSelectTag,
    handleOpenTagModel,
    onSave,
  };
}
