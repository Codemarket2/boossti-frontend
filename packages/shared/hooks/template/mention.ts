import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TEMPLATES, GET_PAGES_BY_TYPE } from '../../graphql/query/template';

const defaultGetTemplates = { limit: 100, page: 1, search: '' };

export function useMention() {
  const [state, setState] = useState({
    selectedList: { items: [] },
    showSubList: false,
    selectedType: '',
  });
  const { data, error, loading } = useQuery(GET_TEMPLATES, {
    variables: defaultGetTemplates,
  });

  const { data: itemsData } = useQuery(GET_PAGES_BY_TYPE, {
    variables: { ...defaultGetTemplates, types: state.selectedType ? [state.selectedType] : [] },
  });

  const pages =
    itemsData && itemsData.getPages
      ? itemsData.getPages.data.map((page) => ({
          id: page._id,
          display: page.title,
        }))
      : [];

  const templates =
    data && data.getTemplates
      ? data.getTemplates.data.map((template) => ({ id: template._id, display: template.title }))
      : [];

  const suggestions = state.showSubList ? pages : templates;

  return { state, setState, data, error, loading, suggestions };
}
