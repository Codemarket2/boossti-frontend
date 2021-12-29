import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { IHooksProps } from '../../types/common';
import { UPDATE_LIST_ITEM_LAYOUTS } from '../../graphql/mutation/list';
import { updateCache } from './updateListItem';

interface IProps extends IHooksProps {
  _id: string;
  slug: string;
  layouts: any;
}

export function useUpdateItemLayout({ onAlert, slug, layouts, _id }: IProps) {
  const [updateMutation] = useMutation(UPDATE_LIST_ITEM_LAYOUTS);
  const [saveToServer, setSaveToServer] = useState(false);

  useEffect(() => {
    let timeOutId;
    if (saveToServer && layouts) {
      setSaveToServer(false);
      timeOutId = setTimeout(() => handleUpdate(), 1500);
    }
    return () => clearTimeout(timeOutId);
  }, [layouts]);

  const handleUpdate = () => {
    updateMutation({
      variables: { _id, layouts: JSON.stringify(layouts) },
    }).catch((error) => onAlert('Error', error.message));
  };

  const handleUpdateLayout = async (newLayouts) => {
    try {
      setSaveToServer(true);
      updateCache(slug, { layouts: JSON.stringify(newLayouts) });
    } catch (error) {
      console.log('Error', error);
      onAlert('Error', error.message);
    }
  };

  return { handleUpdateLayout };
}
