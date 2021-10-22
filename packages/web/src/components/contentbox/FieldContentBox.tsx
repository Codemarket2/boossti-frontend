import { useRouter } from 'next/router';
import { useGetFieldValue, useUpdateFieldValue } from '@frontend/shared/hooks/field';
import Box from './Box';
import ErrorLoading from '../common/ErrorLoading';
import { seprator } from './seprator';

export default function FieldContentBox({ _id }: any) {
  const { data, error, loading } = useGetFieldValue(_id);
  // const [state, setState] = useState()
  const { handleUpdateField } = useUpdateFieldValue();
  const router = useRouter();

  const onSave = async (sPageHTML, sMainCss, sSectionCss) => {
    try {
      if (sPageHTML === '') {
        const anwser = confirm('Are you sure clear');
        if (!anwser) {
          return null;
        }
      }
      const value = `${sPageHTML}${seprator}${sMainCss}${seprator}${sSectionCss}`;
      const payload = {
        _id,
        value,
      };
      await handleUpdateField(payload);
      console.log('saved');
    } catch (error) {
      console.log('Error while auto save', error);
      alert('Error while auto save' + error.message);
    }
  };

  if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <Box
      data={data}
      onClose={() => {
        router.push(`/types/${router.query.slug}/${router.query.itemSlug}`);
      }}
      onSave={onSave}
    />
  );
}
