import { IHooksProps } from '../../types/common';
import { getFormBySlug } from '../form';
import { useCreateUpdateResponse } from '../response';

interface IPayload {
  url: string;
  alt: string;
  type: string;
  size: number;
}

export const useSaveFileLibraryResponse = ({ onAlert }: IHooksProps) => {
  const { handleCreateUpdateResponse } = useCreateUpdateResponse({ onAlert });
  const handleSaveFileLibraryResponse = async ({ url, alt, type, size }: IPayload) => {
    const form = await getFormBySlug('file-library');
    if (!form) {
      throw new Error('create file library form');
    }
    const values = form.fields.map((field) => {
      const value = { field: field?._id, value: '', valueNumber: null };
      switch (field?.label?.toLowerCase()) {
        case 'file':
          value.value = url;
          break;
        case 'alt':
          value.value = alt;
          break;
        case 'type':
          value.value = type;
          break;
        case 'size':
          value.valueNumber = size;
          break;
        default:
          break;
      }
      return value;
    });
    //   create response
    // debugger;
    const response = await handleCreateUpdateResponse(
      { formId: form?._id, values },
      form?.fields,
      false,
    );
    return response;
  };
  return { handleSaveFileLibraryResponse };
};
