import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_LIST_TYPE, UPDATE_LIST_TYPE, DELETE_LIST_TYPE } from '../../graphql/mutation/list';
import { GET_LIST_TYPES } from '../../graphql/query/list';
import { IHooksProps } from '../../types/common';
import { fileUpload } from '../../utils/fileUpload';
import { omitTypename } from '../../utils/omitTypename';

const defaultGetListTypes = { limit: 100, page: 1 };

export function useGetListTypes() {
  const { data, error, loading } = useQuery(GET_LIST_TYPES, {
    variables: defaultGetListTypes,
  });

  return { data, error, loading };
}

const listTypesValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

interface IListTypesFormValues {
  _id: string;
  edit: boolean;
  name: string;
  description: string;
}

const listTypesDefaultValue = {
  _id: '',
  edit: false,
  name: '',
  description: '',
};

export function useCRUDListTypes({ onAlert }: IHooksProps) {
  const [state, setState] = useState({
    showForm: false,
    showCRUDMenu: null,
    selectedListType: null,
    media: [],
    tempMediaFiles: [],
    tempMedia: [],
  });

  const [createListTypeMutation, { loading: createLoading }] = useMutation(CREATE_LIST_TYPE);
  const [updateListTypeMutation, { loading: updateLoading }] = useMutation(UPDATE_LIST_TYPE);
  const [deleteListTypeMutation, { loading: deleteLoading }] = useMutation(DELETE_LIST_TYPE);

  const listTypeFormik = useFormik({
    initialValues: listTypesDefaultValue,
    validationSchema: listTypesValidationSchema,
    onSubmit: async (payload: IListTypesFormValues) => {
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
        if (newPayload.edit) {
          await onUpdate(newPayload);
        } else {
          await onCreate(newPayload);
        }
        listTypeFormik.handleReset('');
        setState({
          ...state,
          showForm: false,
          showCRUDMenu: null,
          selectedListType: null,
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
      const { getListTypes } = client.readQuery({
        query: GET_LIST_TYPES,
        variables: defaultGetListTypes,
      });

      const newData = {
        getListTypes: {
          ...getListTypes,
          data: [...getListTypes.data, mutationResult.data.createListType],
        },
      };

      client.writeQuery({
        query: GET_LIST_TYPES,
        variables: defaultGetListTypes,
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
      const { getListTypes } = client.readQuery({
        query: GET_LIST_TYPES,
        variables: defaultGetListTypes,
      });

      const newData = {
        getListTypes: {
          ...getListTypes,
          data: getListTypes.data.map((b) =>
            b._id === state.selectedListType._id ? mutationResult.data.updateListType : b,
          ),
        },
      };
      client.writeQuery({
        query: GET_LIST_TYPES,
        variables: defaultGetListTypes,
        data: newData,
      });
    };
    await updateListTypeMutation({
      variables: payload,
      update: updateInCache,
    });
  };

  const handleDelete = async () => {
    try {
      const deleteInCache = (client) => {
        const { getListTypes } = client.readQuery({
          query: GET_LIST_TYPES,
          variables: defaultGetListTypes,
        });

        const newData = {
          getListTypes: {
            ...getListTypes,
            data: getListTypes.data.filter((b) => b._id !== state.selectedListType._id),
          },
        };
        client.writeQuery({
          query: GET_LIST_TYPES,
          variables: defaultGetListTypes,
          data: newData,
        });
      };
      await deleteListTypeMutation({
        variables: { _id: state.selectedListType._id },
        update: deleteInCache,
      });
      setState({ ...state, showCRUDMenu: null, selectedListType: null });
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  const handleShowForm = (edit?: boolean) => {
    if (edit) {
      // console.log('state.selectedListType.media', state.selectedListType.description);
      listTypeFormik.setFieldValue('edit', true, false);
      listTypeFormik.setFieldValue('name', state.selectedListType.name, false);
      listTypeFormik.setFieldValue('description', state.selectedListType.description, false);
      listTypeFormik.setFieldValue('_id', state.selectedListType._id, false);
      setState({
        ...state,
        showForm: true,
        media: state.selectedListType.media,
        tempMediaFiles: [],
        tempMedia: [],
        showCRUDMenu: null,
      });
    } else {
      listTypeFormik.handleReset('');
      setState({
        ...state,
        showForm: true,
        media: [],
        tempMediaFiles: [],
        tempMedia: [],
      });
    }
  };

  const CRUDLoading = createLoading || updateLoading || deleteLoading;

  return { state, setState, listTypeFormik, handleShowForm, handleDelete, CRUDLoading };
}
