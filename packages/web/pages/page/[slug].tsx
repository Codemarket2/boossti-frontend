import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useGetResponses } from '@frontend/shared/hooks/response/getResponse';
import { useGetForm } from '@frontend/shared/hooks/form/getForm';
import { IAttributes as ISetting } from '@frontend/shared/redux/actions/setting';
import parse from 'html-react-parser';

const PageId = (setting: any) => {
  if (setting?.appForm) {
    // console.log('appform', selector.setting.appForm);
    const data1 = setting?.appForm?.fields.filter((item) => item?.form?.name === 'Pages');
    const pageId = data1?.[0]?.form?._id; // || '6324e600fe046781e9d33d6f'; //Form ID for form named pages "6324e600fe046781e9d33d6f"
    // console.log(pageId);
    return pageId;
  }
};
const fieldId = (pageId: string) => {
  const { data: form, error: formError, loading: formLoading } = useGetForm(pageId);
  // console.log(form);
  const htmlField = form?.getForm?.fields?.filter((item) => item?.label === 'HTML Content');
  const htmlFieldId = htmlField?.[0]?._id;
  const slug1 = form?.getForm?.fields?.filter((item) => item?.label === 'slug');
  const slugId = slug1?.[0]?._id;
  return {
    slugId,
    htmlFieldId,
  };
};
const htmlCode = (slugId: string, htmlFieldId: string, slug: string | string[], pageId) => {
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
    const code = data?.getResponses?.data[0]?.values?.filter((item) => item?.field === htmlFieldId);
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
  const setting = useSelector((state: { setting: ISetting }) => state.setting);
  const isApp = setting?.isApp;
  // search for appid in slug
  const pageId = PageId(setting);
  const fieldID = fieldId(pageId);
  const html = htmlCode(fieldID.slugId, fieldID.htmlFieldId, slug, pageId);

  // return <div> {parse(String(html))}</div>;
  if (!isApp) {
    return <>TODO 404 Page</>;
  }

  return <div> {String(html) !== 'undefined' ? parse(String(html)) : <>Loading</>}</div>;
};

export default Slug;
