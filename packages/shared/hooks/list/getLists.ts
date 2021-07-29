import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { GET_LISTS, GET_INUSE_LISTS } from '../../graphql/query/list';
import { CREATE_LIST } from '../../graphql/mutation/list';
import { loadListsAction, addListAction } from '../../redux/actions/list';
import * as yup from 'yup';
import { useFormik } from 'formik';

const addListValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

interface IAddListFormValues {
  name: string;
}

export function useGetInUseLists() {
  const { data, error, loading } = useQuery(GET_INUSE_LISTS, {
    variables: { limit: 100, page: 1 },
  });

  const [state, setState] = useState({
    selectedList: { items: [] },
    showSubList: false,
  });

  const suggestions = state.showSubList
    ? state.selectedList.items.map((item) => ({ id: item._id, display: item.title }))
    : data && data.getLists
    ? data.getLists.data.map((list) => ({ id: list._id, display: list.name }))
    : [];
  return { data, error, loading, suggestions, state, setState };
}

export function useGetLists() {
  const { data, error, loading } = useQuery(GET_LISTS, {
    variables: { limit: 100, page: 1 },
    fetchPolicy: 'network-only',
  });
  const dispatch = useDispatch();
  const [state, setState] = useState({ showForm: false, name: '' });
  const [createListMutation] = useMutation(CREATE_LIST);
  //   console.log('data, error, loading', data, error, loading);
  useEffect(() => {
    if (data && data.getLists) {
      dispatch(loadListsAction(data.getLists.data));
    }
  }, [data]);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: addListValidationSchema,
    onSubmit: async (values: IAddListFormValues) => {
      await onSubmit(values);
    },
  });

  const handleCloseForm = () => {
    setState({ ...state, showForm: false });
  };

  const handleShowForm = () => {
    setState({ ...state, showForm: true });
  };

  const onSubmit = async (payload) => {
    const { data: createData } = await createListMutation({
      variables: {
        ...payload,
      },
    });
    if (createData && createData.createList) {
      dispatch(addListAction(createData.createList));
    }
    formik.handleReset('');
    setState({ ...state, showForm: false });
  };

  return { formik, state, loading, handleShowForm, handleCloseForm };
}
