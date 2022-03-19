import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import { client as apolloClient } from '../../graphql';
import { CREATE_PAGE, UPDATE_PAGE, DELETE_PAGE } from '../../graphql/mutation/template';
import {
  GET_PAGES_BY_TYPE,
  GET_PAGE_BY_ID,
  GET_PAGE_BY_SLUG,
  GET_LIST_PAGE_MENTIONS,
} from '../../graphql/query/template';
import { IHooksProps } from '../../types/common';
import { fileUpload } from '../../utils/fileUpload';
import { omitTypename } from '../../utils/omitTypename';
import { ADDED_PAGE, UPDATED_PAGE } from '../../graphql/subscription/template';
import { updateLikeInCache } from '../like/createLike';
// import { GET_PAGE_MENTIONS } from '../../graphql/query/field';
import { compressedFile } from '../../utils/compressFile';
import { parsePayload } from '../section/getSection';

const defaultGetPages = { limit: 100, page: 1 };
export function useGetpageFieldMentions(_id) {
  const { data } = useQuery(GET_LIST_PAGE_MENTIONS, {
    variables: { _id },
  });
  const pageMentionsField = data?.getListPageMentions?.data.map((val) => (val = val._id));

  return { pageMentionsField };
}

// export function useGetTemplateFieldMentions(_id) {
//   const { data } = useQuery(GET_PAGE_MENTIONS, {
//     variables: { _id },
//   });
//   const templateMentionsField = data?.getPageMentions?.data.map((val) => (val = val.parentId));
//   return { templateMentionsField };
// }

export function useGetPageById(_id) {
  const { data } = useQuery(GET_PAGE_BY_ID, {
    variables: { _id },
  });
  return { data };
}

export async function getPage(_id) {
  try {
    const response = await apolloClient.query({
      query: GET_PAGE_BY_ID,
      variables: { _id },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export function useGetPagesByTemplate({ template  }: any) {
  const [state, setState] = useState({
    search: '',
    showSearch: false,
  });
  const [subscribed, setSubscribed] = useState(false);
  const { data, error, loading, subscribeToMore } = useQuery(GET_PAGES_BY_TYPE, {
    variables: { ...defaultGetPages, template, search: state.search },
    fetchPolicy: 'cache-and-network',
  });

  // console.log('data, loading, error', data, loading, error);

  useEffect(() => {
    if (!subscribed) {
      setSubscribed(true);
      subscribeToMore({
        document: ADDED_PAGE,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newPage = subscriptionData.data.addedPage;
          if (template === newPage.addedPage?.template?._id) {
            updateLikeInCache(newPage._id, 1);
            let isNew = true;
            let newData = prev?.getPages?.data?.map((t) => {
              if (t._id === newPage._id) {
                isNew = false;
                return newPage;
              }
              return t;
            });
            if (isNew) {
              newData = [...prev?.getTemplates?.data, newPage];
            }
            return {
              ...prev,
              getPages: {
                ...prev.getPages,
                data: newData,
              },
            };
          }
        },
      });
    }
  }, []);

  return { data, error, loading, state, setState };
}

export function useGetPageBySlug({ slug }: any) {
  const { data, error, loading, subscribeToMore } = useQuery(GET_PAGE_BY_SLUG, {
    variables: { slug },
  });

  const [subscribed, setSubscribed] = useState(false);
  const [lisItem, setPage] = useState(null);

  useEffect(() => {
    if (data && data?.getPageBySlug) {
      setPage(parsePayload(data.getPageBySlug));
    }
  }, [data]);

  useEffect(() => {
    if (data && data.getPageBySlug && !subscribed) {
      setSubscribed(true);
      subscribeToMore({
        document: UPDATED_PAGE,
        variables: {
          _id: data.getPageBySlug?._id,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newPage = subscriptionData.data.updatedPage;
          return {
            ...prev,
            getPageBySlug: {
              ...prev.getPageBySlug,
              ...newPage,
            },
          };
        },
      });
    }
  }, [data]);

  return { data: lisItem ? { getPageBySlug: lisItem } : null, error, loading };
}

const pagesValidationSchema = yup.object({
  title: yup.string().required('Title is required'),
});

interface IPagesFormValues {
  _id: string;
  edit: boolean;
  title: string;
  description: string;
  slug: string;
  template: string;
}

const pagesDefaultValue = {
  _id: '',
  edit: false,
  title: '',
  description: '',
  slug: '',
};

interface IProps extends IHooksProps {
  template?: any;
  createCallBack?: (arg: string) => void;
  updateCallBack?: (arg: string) => void;
}

export function useCRUDPages({ onAlert, template, createCallBack, updateCallBack }: IProps) {
  const [state, setState] = useState({
    showForm: false,
    showCRUDMenu: null,
    selectedPage: null,
    media: [],
    tempMediaFiles: [],
    tempMedia: [],
  });

  const [createPageMutation, { loading: createLoading }] = useMutation(CREATE_PAGE);
  const [updatePageMutation, { loading: updateLoading }] = useMutation(UPDATE_PAGE);

  const formik = useFormik({
    initialValues: pagesDefaultValue,
    validationSchema: pagesValidationSchema,
    onSubmit: async (payload: IPagesFormValues, { setFieldError }) => {
      try {
        let newMedia = [];
        let newPayload: any = { ...payload };
        if (state.tempMediaFiles.length > 0) {
          newMedia = await fileUpload(state.tempMediaFiles, '/pages', compressedFile);
          newMedia = newMedia.map((n, i) => ({ url: n, caption: state.tempMedia[i].caption }));
        }
        let media = [...state.media, ...newMedia];
        media = media.map((m) => JSON.parse(JSON.stringify(m), omitTypename));
        newPayload = { ...newPayload, media, template };
        if (newPayload.edit) {
          const res = await onUpdate(newPayload);
          updateCallBack(res.data.updatePage.slug);
        } else {
          let res = await onCreate(newPayload);
          createCallBack(res.data.createPage.slug);
        }
      } catch (error) {
        if (error?.message?.includes('duplicate key error')) {
          return setFieldError('slug', 'This slug is already taken');
        }
        onAlert('Error', error.message);
      }
    },
  });
  const onCreate = async (payload) => {
    // const createInCache = (client, mutationResult) => {
    //   const { getPages } = client.readQuery({
    //     query: GET_PAGES_BY_TYPE,
    //     variables: defaultGetPages,
    //   });
    //   const newData = {
    //     getPages: {
    //       ...getPages,
    //       data: [...getPages.data, mutationResult.data.createPage],
    //     },
    //   };
    //   client.writeQuery({
    //     query: GET_PAGES_BY_TYPE,
    //     variables: defaultGetPages,
    //     data: newData,
    //   });
    // };
    return await createPageMutation({
      variables: payload,
      // update: createInCache,
    });
  };

  const onUpdate = async (payload) => {
    // console.log('onUpdate function');
    const updateInCache = (client, mutationResult) => {
      const res = client.readQuery({
        query: GET_PAGE_BY_SLUG,
        variables: { slug: mutationResult.data.updatePage.slug },
      });
      const newData = {
        getPageBySlug: mutationResult.data.updatePage,
      };
      client.writeQuery({
        query: GET_PAGE_BY_SLUG,
        variables: { slug: mutationResult.data.updatePage.slug },
        data: newData,
      });
    };
    return await updatePageMutation({
      variables: payload,
      update: updateInCache,
    });
  };

  const setFormValues = (item) => {
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('title', item.title, false);
    formik.setFieldValue('description', item.description, false);
    formik.setFieldValue('slug', item.slug, false);
    formik.setFieldValue('_id', item._id, false);

    setState({
      ...state,
      media: item.media,
      tempMediaFiles: [],
      tempMedia: [],
    });
  };

  const CRUDLoading = createLoading || updateLoading || formik.isSubmitting;

  return { state, setState, formik, setFormValues, CRUDLoading };
}

export function useCreatePage({ onAlert }: IHooksProps) {
  const [createPageMutation, { loading: createLoading }] = useMutation(CREATE_PAGE);
  const handleCreate = async (template, createCallback) => {
    try {
      const payload = {
        template,
        title: `${uuid()}-${new Date().getTime()}-n-e-w`,
        description: '',
        media: [],
      };
      const res = await createPageMutation({
        variables: payload,
      });
      createCallback(res.data.createPage.slug);
    } catch (error) {
      onAlert('Error', error.message);
    }
  };
  return { handleCreate, createLoading };
}

const updateInCache = async (slug, fieldItem) => {
  const { getPageBySlug } = await apolloClient.readQuery({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });
  const newData = {
    getPageBySlug: {
      ...getPageBySlug,
      fieldItem: !fieldItem,
    },
  };
  apolloClient.writeQuery({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
    data: newData,
  });
};

export function useDeletePage({ onAlert }: IHooksProps) {
  const [deletePageMutation, { loading: deleteLoading }] = useMutation(DELETE_PAGE);
  const handleDelete = async (_id: any, deleteCallBack: any) => {
    try {
      await deletePageMutation({
        variables: { _id },
      });
      deleteCallBack();
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleDelete, deleteLoading };
}
