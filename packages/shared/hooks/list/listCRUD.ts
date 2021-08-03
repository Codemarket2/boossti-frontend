import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { GET_LIST } from '../../graphql/query/list';
import {
  UPDATE_LIST,
  DELETE_LIST,
  ADD_LIST_ITEM,
  UPDATE_LIST_ITEM,
  DELETE_LIST_ITEM,
} from '../../graphql/mutation/list';
import { updateListAction, removeListAction } from '../../redux/actions/list';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { fileUpload } from '../../utils/fileUpload';
import { omitTypename } from '../../utils/omitTypename';

const listItemFormValidationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string(),
});

interface IListItemFormValues {
  _id: string;
  title: string;
  description: string;
}

const listItemFormDefaultValue = {
  _id: '',
  title: '',
  description: '',
};

interface IProps {
  _id: string;
  onListDelete: () => void;
  onItemDelete: () => void;
  onAlert: (a: string, b: string) => void;
}

const updateListFormValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

interface IUpdateListFormValues {
  name: string;
}

export function useListCRUD({ _id, onListDelete, onItemDelete, onAlert }: IProps) {
  const { data, error, loading } = useQuery(GET_LIST, {
    variables: { _id },
    fetchPolicy: 'network-only',
  });
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    showListForm: false,
    showItemForm: false,
    list: null,
    listdeleteLoading: false,
    itemdeleteLoading: false,
    editItem: false,
    media: [],
    tempMediaFiles: [],
    tempMedia: [],
  });
  const [updateListMutation] = useMutation(UPDATE_LIST);
  const [deleteListMutation] = useMutation(DELETE_LIST);
  const [addListItemMutation] = useMutation(ADD_LIST_ITEM);
  const [updateListItemMutation] = useMutation(UPDATE_LIST_ITEM);
  const [deleteListItemMutation] = useMutation(DELETE_LIST_ITEM);
  //   console.log('data, error, loading', data, error, loading);
  useEffect(() => {
    if (data && data.getList) {
      setState({ ...state, list: data.getList });
    }
  }, [data]);

  const itemFormik = useFormik({
    initialValues: listItemFormDefaultValue,
    validationSchema: listItemFormValidationSchema,
    onSubmit: async (values: IListItemFormValues) => {
      await onSave(values);
    },
  });

  const listFormik = useFormik({
    initialValues: { name: '' },
    validationSchema: updateListFormValidationSchema,
    onSubmit: async (values: IUpdateListFormValues) => {
      await onSubmitList(values);
    },
  });

  const onSave = async (values: IListItemFormValues) => {
    try {
      let newMedia = [];
      if (state.tempMediaFiles.length > 0) {
        newMedia = await fileUpload(state.tempMediaFiles, '/list-items');
        newMedia = newMedia.map((n, i) => ({ url: n, caption: state.tempMedia[i].caption }));
      }
      let media = [...state.media, ...newMedia];
      media = media.map((m) => JSON.parse(JSON.stringify(m), omitTypename));
      if (state.editItem) {
        await handleUpdateItem({ ...values, media });
      } else {
        await handleAddItem({ ...values, media });
      }
    } catch (error) {
      setState({ ...state, submitLoading: false });
      onAlert('Error', error.message);
    }
  };

  const handleAddItem = async (payload) => {
    try {
      const { data: addListItemData } = await addListItemMutation({
        variables: {
          ...payload,
          listId: _id,
        },
      });
      itemFormik.handleReset('');
      setState({
        ...state,
        showItemForm: false,
        list: { ...state.list, items: addListItemData.addListItem.items },
      });
    } catch (error) {
      return onAlert('Error', error.message);
    }
  };

  const handleUpdateItem = async (payload) => {
    try {
      const { data: updateListItemData } = await updateListItemMutation({
        variables: {
          ...payload,
          listId: _id,
        },
      });
      itemFormik.handleReset('');
      setState({
        ...state,
        showItemForm: false,
        list: { ...state.list, items: updateListItemData.updateListItem.items },
      });
    } catch (error) {
      return onAlert('Error', error.message);
    }
  };

  const handleDeleteItem = async (deleteID: string) => {
    try {
      setState({
        ...state,
        itemdeleteLoading: true,
      });
      await deleteListItemMutation({
        variables: {
          listId: _id,
          _id: deleteID,
        },
      });
      onItemDelete();
      setState({
        ...state,
        itemdeleteLoading: false,
        list: { ...state.list, items: state.list.items.filter((i) => i._id !== deleteID) },
      });
    } catch (error) {
      return onAlert('Error', error.message);
    }
  };

  const onSubmitList = async (payload) => {
    try {
      const { data: updateData } = await updateListMutation({
        variables: {
          ...payload,
          _id,
        },
      });
      if (updateData && updateData.updateList) {
        dispatch(updateListAction(updateData.updateList));
      }
      listFormik.handleReset('');
      setState({
        ...state,
        showListForm: false,
        list: { ...state.list, name: updateData.updateList.name },
      });
    } catch (error) {
      return onAlert('Error', error.message);
    }
  };

  const handleDeleteList = async () => {
    try {
      if (!state.list || state.list.inUse) {
        throw { message: 'This list is currently been use in frontend' };
      } else {
        setState({
          ...state,
          listdeleteLoading: true,
        });
        await deleteListMutation({
          variables: {
            _id,
          },
        });
        dispatch(removeListAction(_id));
        onListDelete();
      }
    } catch (error) {
      return onAlert('Error', error.message);
    }
  };

  return {
    state,
    setState,
    itemFormik,
    listFormik,
    list: state.list,
    error,
    loading,
    handleDeleteList,
    handleDeleteItem,
  };
}
