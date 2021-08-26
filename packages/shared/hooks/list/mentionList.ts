import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LIST_TYPES, GET_LIST_ITEMS_BY_TYPE } from '../../graphql/query/list';

const defaultGetListTypes = { limit: 100, page: 1, search: '' };

export function useMentionList() {
  const [state, setState] = useState({
    selectedList: { items: [] },
    showSubList: false,
    selectedType: '',
  });
  const { data, error, loading } = useQuery(GET_LIST_TYPES, {
    variables: defaultGetListTypes,
  });

  const { data: itemsData } = useQuery(GET_LIST_ITEMS_BY_TYPE, {
    variables: { ...defaultGetListTypes, types: state.selectedType ? [state.selectedType] : [] },
  });

  const listItems =
    itemsData && itemsData.getListItems
      ? itemsData.getListItems.data.map((listItem) => ({
          id: listItem._id,
          display: listItem.title,
        }))
      : [];

  const listTypes =
    data && data.getListTypes
      ? data.getListTypes.data.map((listType) => ({ id: listType._id, display: listType.title }))
      : [];

  const suggestions = state.showSubList ? listItems : listTypes;

  return { state, setState, data, error, loading, suggestions };
}
