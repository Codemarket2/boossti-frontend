import { useRouter } from 'next/router';
import { useGetFieldValue, useUpdateFieldValue } from '@frontend/shared/hooks/field';
import Box from './Box';
import ErrorLoading from '../common/ErrorLoading';
import { seprator } from './seprator';

export default function FieldContentBox({ _id }: any) {
  const { data, error, loading } = useGetFieldValue(_id);
  const { handleUpdateField } = useUpdateFieldValue();
  const router = useRouter();

  const onSave = async (sPageHTML, sMainCss, sSectionCss) => {
    const value = `${sPageHTML}${seprator}${sMainCss}${seprator}${sSectionCss}`;
    const payload = {
      _id,
      value,
    };
    const res = await handleUpdateField(payload);
    // console.log('Saved', res);
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
