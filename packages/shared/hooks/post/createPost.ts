import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST } from '../../graphql/mutation/post';
import { useGetInUseLists } from '../list';
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
  const { data, loading, error } = useGetInUseLists();
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

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      let newArray = [...state.tempMedia];
      for (let i = 0; i < event.target.files.length; i++) {
        let item = {
          url: URL.createObjectURL(event.target.files[i]),
          type: event.target.files[i].type,
          caption: '',
        };
        newArray.push(item);
      }
      setState({
        ...state,
        tempMediaFiles: [...state.tempMediaFiles, ...event.target.files],
        tempMedia: newArray,
      });
    }
  };

  const onTempCaptionChange = (value: string, index: number) => {
    setState({
      ...state,
      tempMedia: state.tempMedia.map((t, i) => (i === index ? { ...t, caption: value } : t)),
    });
  };
  const onCaptionChange = (value: string, index: number) => {
    setState({
      ...state,
      media: state.media.map((t, i) => (i === index ? { ...t, caption: value } : t)),
    });
  };

  const handleRemoveMedia = (index: number) => {
    let urlArray = [...state.media];
    urlArray.splice(index, 1);
    setState({ ...state, media: urlArray });
  };

  const handleRemoveTempMedia = (index: number) => {
    let fileArray = [...state.tempMediaFiles];
    let urlArray = [...state.tempMedia];
    fileArray.splice(index, 1);
    urlArray.splice(index, 1);
    setState({ ...state, tempMedia: urlArray, tempMediaFiles: fileArray });
  };

  return {
    state,
    setState,
    data,
    loading,
    error,
    handleChange,
    handleSelectTag,
    handleOpenTagModel,
    onSave,
    handleFileChange,
    handleRemoveTempMedia,
    handleRemoveMedia,
    onTempCaptionChange,
    onCaptionChange,
  };
}
