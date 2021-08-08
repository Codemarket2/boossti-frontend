import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_LIST_TYPE, UPDATE_LIST_TYPE, DELETE_LIST_TYPE } from '../../graphql/mutation/list';
import { GET_LIST_TYPES, GET_LIST_TYPE_BY_SLUG } from '../../graphql/query/list';
import { IHooksProps } from '../../types/common';
import { fileUpload } from '../../utils/fileUpload';
import { omitTypename } from '../../utils/omitTypename';

const defaultGetListTypes = { limit: 100, page: 1 };

export function useGetListTypes() {
  const [state, setState] = useState({
    search: '',
    showSearch: false,
  });

  const { data, error, loading } = useQuery(GET_LIST_TYPES, {
    variables: { defaultGetListTypes, search: state.search },
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading, state, setState };
}

export function useGetListTypeBySlug({ slug }: any) {
  const { data, error, loading } = useQuery(GET_LIST_TYPE_BY_SLUG, {
    variables: { slug },
    fetchPolicy: 'cache-and-network',
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

interface IProps extends IHooksProps {
  createCallBack: (slug: string) => void;
}

export function useCRUDListTypes({ onAlert, createCallBack }: IProps) {
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

  const formik = useFormik({
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
        formik.handleReset('');
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
    // const createInCache = (client, mutationResult) => {
    //   const { getListTypes } = client.readQuery({
    //     query: GET_LIST_TYPES,
    //     variables: defaultGetListTypes,
    //   });

    //   const newData = {
    //     getListTypes: {
    //       ...getListTypes,
    //       data: [...getListTypes.data, mutationResult.data.createListType],
    //     },
    //   };

    //   client.writeQuery({
    //     query: GET_LIST_TYPES,
    //     variables: defaultGetListTypes,
    //     data: newData,
    //   });
    // };
    const res = await createListTypeMutation({
      variables: payload,
      // update: createInCache,
    });
    createCallBack(res.data.createListType.slug);
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
      formik.setFieldValue('edit', true, false);
      formik.setFieldValue('name', state.selectedListType.name, false);
      formik.setFieldValue('description', state.selectedListType.description, false);
      formik.setFieldValue('_id', state.selectedListType._id, false);
      setState({
        ...state,
        showForm: true,
        media: state.selectedListType.media,
        tempMediaFiles: [],
        tempMedia: [],
        showCRUDMenu: null,
      });
    } else {
      formik.handleReset('');
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

  return { state, setState, formik, handleShowForm, handleDelete, CRUDLoading };
}
