import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useGetResponses } from '@frontend/shared/hooks/response/getResponse';
import { useGetFormBySlug } from '@frontend/shared/hooks/form/getForm';
import { IAttributes as ISetting } from '@frontend/shared/redux/actions/setting';
import parse from 'html-react-parser';
import CircularProgress from '@mui/material/CircularProgress';

const useFieldId = () => {
  const { data: form, error: formBySlugError, loading: formBySlugLoading } = useGetFormBySlug(
    'pages',
  );
  // console.log(form);
  const pageId = form?.getFormBySlug?._id;
  const htmlField = form?.getFormBySlug?.fields?.filter((item) => item?.label === 'HTML Content');
  const htmlFieldId = htmlField?.[0]?._id;
  const slug1 = form?.getFormBySlug?.fields?.filter((item) => item?.label === 'slug');
  const slugId = slug1?.[0]?._id;
  return {
    pageId,
    slugId,
    htmlFieldId,
  };
};
const useHtmlCode = (slugId: string, htmlFieldId: string, slug: string | string[], pageId) => {
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
  // const pageId = PageId(setting);
  const fieldID = useFieldId();
  const html = useHtmlCode(fieldID.slugId, fieldID.htmlFieldId, slug, fieldID.pageId);

  // if (!isApp) {
  //   return <>TODO 404 Page</>;
  // }

  return (
    <div>
      {String(html) !== 'undefined' ? (
        parse(String(html))
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Slug;
