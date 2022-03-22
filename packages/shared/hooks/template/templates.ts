import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuid } from 'uuid';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TEMPLATE, UPDATE_TEMPLATE, DELETE_TEMPLATE } from '../../graphql/mutation/template';
import { GET_TEMPLATES, GET_TEMPLATE_BY_SLUG } from '../../graphql/query/template';
import { IHooksProps } from '../../types/common';
import { fileUpload } from '../../utils/fileUpload';
import { omitTypename } from '../../utils/omitTypename';
import { ADDED_TEMPLATE, UPDATED_TEMPLATE } from '../../graphql/subscription/template';
import { compressedFile } from '../../utils/compressFile';
import { parsePayload } from '../section/getSection';

const defaultQueryVariables = { limit: 25, page: 1 };

interface IQueryProps {
  limit?: number;
  page?: number;
}

export function useGetTemplates(queryVariables?: IQueryProps) {
  const [state, setState] = useState({
    search: '',
    showSearch: false,
  });
  const [subscribed, setSubscribed] = useState(false);

  const limit =
    queryVariables && queryVariables.limit ? queryVariables.limit : defaultQueryVariables.limit;
  const page =
    queryVariables && queryVariables.page ? queryVariables.page : defaultQueryVariables.page;

  const { data, error, loading, subscribeToMore } = useQuery(GET_TEMPLATES, {
    variables: { limit, page, search: state.search },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    let unsubscribe = () => null;
    if (!subscribed) {
      setSubscribed(true);
      unsubscribe = subscribeToMore({
        document: ADDED_TEMPLATE,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newTemplate = subscriptionData.data.addedTemplate;
          let isNew = true;
          let newData = prev?.getTemplates?.data?.map((t) => {
            if (t._id === newTemplate._id) {
              isNew = false;
              return newTemplate;
            }
            return t;
          });
          if (isNew) {
            newData = [...prev?.getTemplates?.data, newTemplate];
          }
          return {
            ...prev,
            getTemplates: {
              ...prev.getTemplates,
              data: newData,
            },
          };
        },
      });
    }
    return () => unsubscribe();
  }, []);

  return { data, error, loading, state, setState };
}

export function useGetTemplateBySlug({ slug }: any) {
  const { data, error, loading, subscribeToMore } = useQuery(GET_TEMPLATE_BY_SLUG, {
    variables: { slug },
  });
  const [subscribed, setSubscribed] = useState(false);
  const [lisType, setTemplate] = useState(null);

  useEffect(() => {
    if (data && data?.getTemplateBySlug) {
      setTemplate(parsePayload(data.getTemplateBySlug));
    }
  }, [data]);

  useEffect(() => {
    if (data && data.getTemplateBySlug && !subscribed) {
      setSubscribed(true);
      subscribeToMore({
        document: UPDATED_TEMPLATE,
        variables: {
          _id: data.getTemplateBySlug?._id,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newTemplate = subscriptionData.data.updatedTemplate;
          return {
            ...prev,
            getTemplateBySlug: {
              ...prev.getTemplateBySlug,
              ...newTemplate,
            },
          };
        },
      });
    }
  }, [data]);

  return { data: lisType ? { getTemplateBySlug: lisType } : null, error, loading };
}

const pagesList = [
  'admin',
  'comment',
  'feeds',
  'forms',
  'log',
  'types',
  'user',
  'auth',
  'create-post',
  'my-story',
  'saved',
  'style',
  'style33',
];

const templatesValidationSchema = yup.object({
  title: yup.string().required('Title is required').min(3).notOneOf(pagesList),
});

interface ITemplatesFormValues {
  _id: string;
  edit: boolean;
  title: string;
  description: string;
  slug: string;
}

const templatesDefaultValue = {
  _id: '',
  edit: false,
  title: '',
  description: '',
  slug: '',
};

interface IProps extends IHooksProps {
  createCallBack?: (slug: string) => void;
  updateCallBack?: (slug: string) => void;
}

export function useCreateTemplate({ onAlert }: IHooksProps) {
  const [createTemplateMutation, { loading: createLoading }] = useMutation(CREATE_TEMPLATE);
  const handleCreate = async (createCallback) => {
    try {
      const payload = {
        title: `${uuid()}-${new Date().getTime()}-n-e-w`,
        description: '',
        slug: '',
        media: [],
      };
      const res = await createTemplateMutation({
        variables: payload,
      });
      createCallback(res.data.createTemplate.slug);
    } catch (error) {
      onAlert('Error', error.message);
    }
  };
  return { handleCreate, createLoading };
}

export function useCRUDTemplates({ onAlert, createCallBack, updateCallBack }: IProps) {
  const [state, setState] = useState({
    showForm: false,
    showCRUDMenu: null,
    selectedTemplate: null,
    media: [],
    tempMediaFiles: [],
    tempMedia: [],
  });

  const [createTemplateMutation, { loading: createLoading }] = useMutation(CREATE_TEMPLATE);
  const [updateTemplateMutation, { loading: updateLoading }] = useMutation(UPDATE_TEMPLATE);

  const formik = useFormik({
    initialValues: templatesDefaultValue,
    validationSchema: templatesValidationSchema,
    onSubmit: async (payload: ITemplatesFormValues, { setFieldError }) => {
      try {
        const isPage = pagesList.includes(payload.title.toLowerCase());
        if (isPage) {
          return setFieldError('title', 'This title is already taken');
        }
        let newMedia = [];
        let newPayload: any = { ...payload };
        if (state.tempMediaFiles.length > 0) {
          newMedia = await fileUpload(state.tempMediaFiles, '/pages', compressedFile);
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
          selectedTemplate: null,
          media: [],
          tempMediaFiles: [],
          tempMedia: [],
        });
      } catch (error) {
        if (error?.message?.includes('duplicate key error')) {
          return setFieldError('slug', 'This slug is already taken');
        }
        onAlert('Error', error.message);
      }
    },
  });

  const onCreate = async (payload) => {
    const res = await createTemplateMutation({
      variables: payload,
    });
    createCallBack(res.data.createTemplate.slug);
  };

  const onUpdate = async (payload) => {
    const updateInCache = (client, mutationResult) => {
      const data = client.readQuery({
        query: GET_TEMPLATE_BY_SLUG,
        variables: { slug: mutationResult.data.updateTemplate.slug },
      });
      const newData = {
        getTemplateBySlug: mutationResult.data.updateTemplate,
      };
      client.writeQuery({
        query: GET_TEMPLATE_BY_SLUG,
        variables: { slug: mutationResult.data.updateTemplate.slug },
        data: newData,
      });
    };
    const res = await updateTemplateMutation({
      variables: payload,
      update: updateInCache,
    });
    updateCallBack(res.data.updateTemplate.slug);
  };

  const setFormValues = (vType: any) => {
    formik.setFieldValue('edit', true, false);
    formik.setFieldValue('title', vType.title, false);
    formik.setFieldValue('description', vType.description, false);
    formik.setFieldValue('slug', vType.slug, false);
    formik.setFieldValue('_id', vType._id, false);
    setState({
      ...state,
      media: vType.media,
      tempMediaFiles: [],
      tempMedia: [],
    });
  };

  const CRUDLoading = createLoading || updateLoading || formik.isSubmitting;

  return { state, setState, formik, setFormValues, CRUDLoading };
}

export function useDeleteTemplate({ onAlert }: IHooksProps) {
  const [deleteTemplateMutation, { loading: deleteLoading }] = useMutation(DELETE_TEMPLATE);
  const handleDelete = async (_id: any, deleteCallBack: any) => {
    try {
      await deleteTemplateMutation({
        variables: { _id },
      });
      deleteCallBack();
    } catch (error) {
      onAlert('Error', error.message);
    }
  };

  return { handleDelete, deleteLoading };
}
