import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useGetResponses } from '@frontend/shared/hooks/response/getResponse';
import { useGetForm } from '@frontend/shared/hooks/form/getForm';

import parse from 'html-react-parser';

const PageId = (selector: any) => {
  if (selector.setting.appForm) {
    // console.log('appform', selector.setting.appForm);
    const data1 = selector?.setting?.appForm?.fields.filter((item) => item?.form?.name === 'Pages');
    const pageId = data1?.[0]?.form?._id; // || '6324e600fe046781e9d33d6f'; //Form ID for form named pages "6324e600fe046781e9d33d6f"
    // console.log(pageId);
    return pageId;
  }
};
const slugFieldId = (pageId: string) => {
  const { data: form, error: formError, loading: formLoading } = useGetForm(pageId);
  // console.log(form);
  const slug1 = form?.getForm?.fields?.filter((item) => item?.label === 'slug');
  const slugId = slug1?.[0]?._id;
  return slugId;
};
const htmlCode = (slugId: string, slug: string | string[], pageId) => {
  // if (slugId && slug && pageId) {
  const { data, error, loading } = useGetResponses({
    formId: pageId, // || '6324e600fe046781e9d33d6f',
    valueFilter: {
      'values.field': slugId,
      'values.value': slug,
    },
  });

  // console.log(slugId);
  // console.log(data);
  // console.log(`error${error}`);
  let html;
  if (data) {
    const code = data?.getResponses?.data[0]?.values?.filter(
      (item) => item?.field === '6324e6109ae5f7b99a8f5130',
    );
    // console.log(htmlCode);
    html = code?.[0]?.value;
    // console.log(String(html));
    return String(html);
  }
  // }
};
const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const selector = useSelector((state) => state);
  // search for appid in slug
  const pageId = PageId(selector);
  const slugId = slugFieldId(pageId);
  const html = htmlCode(slugId, slug, pageId);

  // return <div> {parse(String(html))}</div>;
  return <div> {String(html) !== 'undefined' ? parse(String(html)) : <>Loading</>}</div>;
};

export default Slug;
