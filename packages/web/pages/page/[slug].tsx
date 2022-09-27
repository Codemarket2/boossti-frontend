import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useGetResponses } from '@frontend/shared/hooks/response/getResponse';
import { useGetForm } from '@frontend/shared/hooks/form/getForm';
import parse from 'html-react-parser';
const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  // search for appid in slug
  const selector = useSelector((state) => state);
  console.log(selector);
  // console.log(selector.setting);
  // const data = selector?.setting?.appForm?.fields.filter((item) => item?.form?.name === 'pages');
  // const pageId = data?.[0]?.form?.name || '6324e600fe046781e9d33d6f'; //Form ID for form named pages "6324e600fe046781e9d33d6f"

  const {
    data: form,
    error: formError,
    loading: formLoading,
  } = useGetForm('6324e600fe046781e9d33d6f');
  console.log(form);
  const slug_id = form?.getForm?.fields?.filter((item) => item?.label === 'slug');
  const slugId = slug_id?.[0]?._id;
  const { data, error, loading, state, setState } = useGetResponses({
    formId: '6324e600fe046781e9d33d6f',
    valueFilter: {
      'values.field': slugId,
      'values.value': slug,
    },
  });

  console.log(slugId);
  console.log(data);
  console.log('error' + error);
  let html;
  if (data) {
    let htmlCode = data?.getResponses?.data[0]?.values?.filter(
      (item) => item?.field === '6324e6109ae5f7b99a8f5130',
    );
    console.log(htmlCode);
    html = htmlCode?.[0]?.value;
    console.log(String(html));
  }

  return <div> {parse(String(html))}</div>;
};

export default Slug;
