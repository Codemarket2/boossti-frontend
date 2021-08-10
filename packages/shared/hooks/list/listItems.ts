import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_LIST_ITEM, UPDATE_LIST_ITEM, DELETE_LIST_ITEM } from '../../graphql/mutation/list';
import { GET_LIST_ITEMS_BY_TYPE, GET_LIST_ITEM_BY_SLUG } from '../../graphql/query/list';
import { IHooksProps } from '../../types/common';
import { fileUpload } from '../../utils/fileUpload';
import { omitTypename } from '../../utils/omitTypename';

const defaultGetListItems = { limit: 100, page: 1 };

export function useGetListItemsByType({ types }: any) {
  const [state, setState] = useState({
    search: '',
    showSearch: false,
  });
  const { data, error, loading } = useQuery(GET_LIST_ITEMS_BY_TYPE, {
    variables: { ...defaultGetListItems, types: types, search: state.search },
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading, state, setState };
}

export function useGetListItemBySlug({ slug }: any) {
  const { data, error, loading } = useQuery(GET_LIST_ITEM_BY_SLUG, {
    variables: { slug },
    fetchPolicy: 'cache-and-network',
  });
  return { data, error, loading };
}

const listItemsValidationSchema = yup.object({
  title: yup.string().required('Title is required'),
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
};

interface IProps extends IHooksProps {
  types?: [string];
  createCallBack?: (arg: string) => void;
  updateCallBack?: () => void;
}

export function useCRUDListItems({ onAlert, types, createCallBack, updateCallBack }: IProps) {
  const [state, setState] = useState({
    showForm: false,
    showCRUDMenu: null,
    selectedListItem: null,
    media: [],
    tempMediaFiles: [],
    tempMedia: [],
  });

  const [createListItemMutation, { loading: createLoading }] = useMutation(CREATE_LIST_ITEM);
  const [updateListItemMutation, { loading: updateLoading }] = useMutation(UPDATE_LIST_ITEM);

  const formik = useFormik({
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
        newPayload = { ...newPayload, media, types };
        if (newPayload.edit) {
          await onUpdate(newPayload);
          updateCallBack();
        } else {
          let res = await onCreate(newPayload);
          createCallBack(res.data.createListItem.slug);
        }
        // formik.handleReset('');
        // setState({
        //   ...state,
        //   showForm: false,
        //   showCRUDMenu: null,
        //   selectedListItem: null,
        //   media: [],
        //   tempMediaFiles: [],
        //   tempMedia: [],
        // });
      } catch (error) {
        onAlert('Error', error.message);
      }
    },
  });

  const onCreate = async (payload) => {
    // const createInCache = (client, mutationResult) => {
    //   const { getListItems } = client.readQuery({
    //     query: GET_LIST_ITEMS_BY_TYPE,
    //     variables: defaultGetListItems,
    //   });
    //   const newData = {
    //     getListItems: {
    //       ...getListItems,
    //       data: [...getListItems.data, mutationResult.data.createListItem],
    //     },
    //   };
    //   client.writeQuery({
    //     query: GET_LIST_ITEMS_BY_TYPE,
    //     variables: defaultGetListItems,
    //     data: newData,
    //   });
    // };
    return await createListItemMutation({
      variables: payload,
      // update: createInCache,
    });
  };

  const onUpdate = async (payload) => {
    const updateInCache = (client, mutationResult) => {
      const res = client.readQuery({
        query: GET_LIST_ITEM_BY_SLUG,
        variables: { slug: mutationResult.data.updateListItem.slug },
      });
      const newData = {
        getListItemBySlug: mutationResult.data.updateListItem,
      };
      client.writeQuery({
        query: GET_LIST_ITEM_BY_SLUG,
        variables: { slug: mutationResult.data.updateListItem.slug },
        data: newData,
      });
    };
    return await updateListItemMutation({
      variables: payload,
      update: updateInCache,
    });
  };

  const setFormValues = (item) => {
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('title', item.title, false);
    formik.setFieldValue('description', item.description, false);
    formik.setFieldValue('_id', item._id, false);

    setState({
      ...state,
      media: item.media,
      tempMediaFiles: [],
      tempMedia: [],
    });
  };

  const CRUDLoading = createLoading || updateLoading;

  return { state, setState, formik, setFormValues, CRUDLoading };
}

export function useDeleteListItem({ onAlert }: IHooksProps) {
  const [deleteListItemMutation, { loading: deleteLoading }] = useMutation(DELETE_LIST_ITEM);
  const handleDelete = async (_id: any, deleteCallBack: any) => {
    try {
      // const deleteInCache = (client) => {
      //   const { getListItems } = client.readQuery({
      //     query: GET_LIST_ITEMS_BY_TYPE,
      //     variables: defaultGetListItems,
      //   });

      //   const newData = {
      //     getListItems: {
      //       ...getListItems,
      //       data: getListItems.data.filter((b) => b._id !== state.selectedListItem._id),
      //     },
      //   };
      //   client.writeQuery({
      //     query: GET_LIST_ITEMS_BY_TYPE,
      //     variables: defaultGetListItems,
      //     data: newData,
      //   });
      // };
      await deleteListItemMutation({
        variables: { _id },
        // update: deleteInCache,
      });
      deleteCallBack();
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleDelete, deleteLoading };
}
