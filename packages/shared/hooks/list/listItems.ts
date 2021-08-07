import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_LIST_ITEM, UPDATE_LIST_ITEM, DELETE_LIST_ITEM } from '../../graphql/mutation/list';
import { GET_LIST_ITEMS } from '../../graphql/query/list';
import { IHooksProps } from '../../types/common';
import { fileUpload } from '../../utils/fileUpload';
import { omitTypename } from '../../utils/omitTypename';

const defaultGetListItems = { limit: 100, page: 1 };

export function useGetListItems() {
  const { data, error, loading } = useQuery(GET_LIST_ITEMS, {
    variables: defaultGetListItems,
  });

  // console.log('data, error, loading ', data, error, loading);

  return { data, error, loading };
}

const listItemsValidationSchema = yup.object({
  title: yup.string().required('Title is required'),
  types: yup
    .array()
    .min(1, 'Select atleast select one type')
    .required('Select atleast select one type')
    .nullable(),
});

interface IListItemsFormValues {
  _id: string;
  edit: boolean;
  title: string;
  description: string;
  types: [string];
}

const listItemsDefaultValue = {
  _id: '',
  edit: false,
  title: '',
  description: '',
  types: [],
};

export function useCRUDListItems({ onAlert }: IHooksProps) {
  const [state, setState] = useState({
    showForm: false,
    showCRUDMenu: null,
    selectedListItem: null,
    media: [],
    tempMediaFiles: [],
    tempMedia: [],
  });

  const [createListTypeMutation, { loading: createLoading }] = useMutation(CREATE_LIST_ITEM);
  const [updateListTypeMutation, { loading: updateLoading }] = useMutation(UPDATE_LIST_ITEM);
  const [deleteListTypeMutation, { loading: deleteLoading }] = useMutation(DELETE_LIST_ITEM);

  const listItemFormik = useFormik({
    initialValues: listItemsDefaultValue,
    validationSchema: listItemsValidationSchema,
    onSubmit: async (payload: IListItemsFormValues) => {
      try {
        let newMedia = [];
        let newPayload: any = { ...payload };
        if (state.tempMediaFiles.length > 0) {
          newMedia = await fileUpload(state.tempMediaFiles, '/list-items');
          newMedia = newMedia.map((n, i) => ({ url: n, caption: state.tempMedia[i].caption }));
        }
        let media = [...state.media, ...newMedia];
        media = media.map((m) => JSON.parse(JSON.stringify(m), omitTypename));
        newPayload = { ...newPayload, media };
        let types = payload.types.map((t) => JSON.parse(t)._id);
        newPayload = { ...newPayload, types };

        if (newPayload.edit) {
          await onUpdate(newPayload);
        } else {
          await onCreate(newPayload);
        }
        listItemFormik.handleReset('');
        setState({
          ...state,
          showForm: false,
          showCRUDMenu: null,
          selectedListItem: null,
          media: [],
          tempMediaFiles: [],
          tempMedia: [],
        });
      } catch (error) {
        onAlert('Error', error.message);
      }
    },
  });

  const onCreate = async (payload) => {
    const createInCache = (client, mutationResult) => {
      const { getListItems } = client.readQuery({
        query: GET_LIST_ITEMS,
        variables: defaultGetListItems,
      });
      const newData = {
        getListItems: {
          ...getListItems,
          data: [...getListItems.data, mutationResult.data.createListItem],
        },
      };
      client.writeQuery({
        query: GET_LIST_ITEMS,
        variables: defaultGetListItems,
        data: newData,
      });
    };
    await createListTypeMutation({
      variables: payload,
      update: createInCache,
    });
  };

  const onUpdate = async (payload) => {
    const updateInCache = (client, mutationResult) => {
      const { getListItems } = client.readQuery({
        query: GET_LIST_ITEMS,
        variables: defaultGetListItems,
      });

      const newData = {
        getListItems: {
          ...getListItems,
          data: getListItems.data.map((b) =>
            b._id === state.selectedListItem._id ? mutationResult.data.updateListItem : b,
          ),
        },
      };
      client.writeQuery({
        query: GET_LIST_ITEMS,
        variables: defaultGetListItems,
        data: newData,
      });
    };
    await updateListTypeMutation({
      variables: payload,
      update: updateInCache,
    });
  };

  const handleDelete = async () => {
    const deleteInCache = (client) => {
      const { getListItems } = client.readQuery({
        query: GET_LIST_ITEMS,
        variables: defaultGetListItems,
      });

      const newData = {
        getListItems: {
          ...getListItems,
          data: getListItems.data.filter((b) => b._id !== state.selectedListItem._id),
        },
      };
      client.writeQuery({
        query: GET_LIST_ITEMS,
        variables: defaultGetListItems,
        data: newData,
      });
    };
    await deleteListTypeMutation({
      variables: { _id: state.selectedListItem._id },
      update: deleteInCache,
    });
    setState({ ...state, showCRUDMenu: null, selectedListItem: null });
  };

  const handleShowForm = (edit?: boolean) => {
    if (edit) {
      listItemFormik.setFieldValue('edit', true, false);
      listItemFormik.setFieldValue('title', state.selectedListItem.title, false);
      listItemFormik.setFieldValue('description', state.selectedListItem.description, false);
      listItemFormik.setFieldValue(
        'types',
        state.selectedListItem.types.map((t) => JSON.stringify(t)),
        false,
      );
      listItemFormik.setFieldValue('_id', state.selectedListItem._id, false);
      setState({
        ...state,
        showForm: true,
        media: state.selectedListItem.media,
        tempMediaFiles: [],
        tempMedia: [],
        showCRUDMenu: null,
      });
    } else {
      listItemFormik.handleReset('');
      setState({ ...state, showForm: true, media: [], tempMediaFiles: [], tempMedia: [] });
    }
  };

  const CRUDLoading = createLoading || updateLoading || deleteLoading;

  return { state, setState, listItemFormik, handleShowForm, handleDelete, CRUDLoading };
}
