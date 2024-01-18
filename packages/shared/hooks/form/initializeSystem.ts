import { useEffect, useState } from 'react';
import { getTemplateBySlug } from '../template/getTemplate';
import { getFormBySlug } from './getForm';

const initialState = {
  loading: false,
  error: false,
};

export const useInitializeSystem = () => {
  const [state, setState] = useState(initialState);

  const checkSystemForm = async () => {
    try {
      //   debugger;
      setState({ ...initialState, loading: true });
      const templateForm = await getFormBySlug('template-form');
      if (templateForm?.slug !== 'template-form') {
        //
      }
      const accountTemplate = await getTemplateBySlug('account');
      //   if(accountTemplate?.data)
      //   debugger;
      setState(initialState);
    } catch (error) {
      setState({ ...initialState, error: error.message });
    }
  };
  useEffect(() => {
    // checkSystemForm();
  }, []);
};
