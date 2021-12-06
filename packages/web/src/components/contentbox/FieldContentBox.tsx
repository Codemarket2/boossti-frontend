import { useRouter } from 'next/router';
import { useGetFieldValue, useUpdateFieldValue } from '@frontend/shared/hooks/field';
import Box from './Box';
import ErrorLoading from '../common/ErrorLoading';
import { seprator } from './seprator';

export default function FieldContentBox({ _id }: any) {
  const { data, error, loading } = useGetFieldValue(_id);
  const { handleUpdateField, updateFieldValueLoading } = useUpdateFieldValue();
  const router = useRouter();

  const onSave = async (sPageHTML, sMainCss, sSectionCss) => {
    try {
      if (sPageHTML === '') {
        return null;
        // const anwser = confirm('Are you sure clear');
        // if (!anwser) {
        //   return null;
        // }
      }
      const value = `${sPageHTML}${seprator}${sMainCss}${seprator}${sSectionCss}`;
      const payload = {
        _id,
        value,
      };
      await handleUpdateField(payload);
    } catch (error) {
      console.log('Error while auto save', error);
      alert('Error while auto save' + error.message);
    }
  };

  if (!loading && !data) {
    return <p>Something went wrong try refreshing the page</p>;
  }
  if (error) {
    return <ErrorLoading error={error} />;
  }

  return (
    <Box
      autoSaveLoading={updateFieldValueLoading}
      data={data}
      onClose={() => {
        window.location.href = `/types/${router.query.slug}/${router.query.itemSlug}`;
        // router.push(`/types/${router.query.slug}/${router.query.itemSlug}`);
      }}
      onSave={onSave}
    />
  );
}
