import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import produce from 'immer';

import { CREATE_CONTACT, DELETE_CONTACT } from '../../graphql/mutation/contact';
import { GET_ALL_CONTACTS, GET_CONTACT } from '../../graphql/query/contact';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  title: yup.string(),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string(),
  businessName: yup.string(),
  groupName: yup.string(),
  website: yup.string(),
  city: yup.string(),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  email: yup.string().email('Invalid Email').required('Email is required'),
  extraField: yup.array().of(
    yup.object({
      fieldName: yup.string(),
      fieldValue: yup.string(),
    }),
  ),
});

interface IFormValues {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  groupName: string;
  website: string;
  city: string;
  extraField: [{ fieldName: string; fieldValue: string }];
}

const defaultFormValues = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
  groupName: '',
  website: '',
  city: '',
  extraField: [{ fieldName: '', fieldValue: '' }],
};

export function useContactForm(): any {
  const [showForm, setShowForm] = useState(false);
  const [createContact, { loading }] = useMutation(CREATE_CONTACT);
  useEffect(() => {
    setShowForm(showForm);
  }, [showForm]);

  const onCreate = async (payload) => {
    const updateCache = (client, mutationResult) => {
      const { getAllContacts } = client.readQuery({
        query: GET_ALL_CONTACTS,
      });
      const newData = produce(getAllContacts, (draft: any) => {
        draft.data.push(mutationResult?.data?.createContact);
      });
      client.writeQuery({
        query: GET_ALL_CONTACTS,
        data: newData,
      });
    };
    await createContact({
      variables: payload,
      update: updateCache,
    });
  };

  const formik = useFormik({
    initialValues: defaultFormValues,
    validationSchema,
    onSubmit: async (payload: IFormValues) => {
      try {
        onCreate(payload);
        setShowForm(!showForm);
        formik.handleReset('');
      } catch (error) {
        alert(error.message);
      }
    },
  });

  const setFormValues = (form) => {
    formik.setFieldValue('title', form.title, false);
    formik.setFieldValue('firstName', form.firstName, false);
    formik.setFieldValue('lastName', form.lastName, false);
    formik.setFieldValue('email', form.email, false);
    formik.setFieldValue('phone', form.phone, false);
    formik.setFieldValue('businessName', form.businessName, false);
    formik.setFieldValue('groupName', form.groupName, false);
    formik.setFieldValue('website', form.website, false);
    formik.setFieldValue('city', form.city, false);
  };

  const formLoading = loading || formik.isSubmitting;
  return { formik, formLoading, setFormValues, setShowForm, showForm };
}

export const useGetAllContact = () => {
  const { data, error, loading } = useQuery(GET_ALL_CONTACTS, {
    variables: { page: 1, limit: 1000 },
    fetchPolicy: 'cache-and-network',
  });

  return {
    data,
    error,
    loading,
  };
};

export const useGetContact = (_id) => {
  const { data, error, loading } = useQuery(GET_CONTACT, {
    variables: {
      _id,
    },
    fetchPolicy: 'cache-and-network',
  });
  return { data, error, loading };
};

export const useDeleteContact = (_id: string) => {
  const [deleteContactMutation, { loading }] = useMutation(DELETE_CONTACT);
  const updateCache = (client) => {
    const { getAllContacts } = client.readQuery({
      query: GET_CONTACT,
    });
    const newData = produce(getAllContacts, (draft: any) => {
      draft.data.filter((c) => c._id !== _id);
    });
    client.writeQuery({
      query: GET_ALL_CONTACTS,
      data: newData,
    });
  };
  const handleDelete = () => {
    deleteContactMutation({
      variables: {
        _id,
        update: updateCache,
      },
    });
  };
  return {
    handleDelete,
    loading,
  };
};
