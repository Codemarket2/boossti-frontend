import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GET_TEMPLATE_BY_SLUG, GET_PAGE_BY_SLUG } from '../graphql/query/template';
import { guestClient } from '../graphql';
import { updateSettingAction } from '../redux/actions/setting';

export async function getTemplateMetaTags(slug) {
  let metaTags = null;
  try {
    const regex = /(<([^>]+)>)/gi;
    const response = await guestClient.query({
      query: GET_TEMPLATE_BY_SLUG,
      variables: { slug },
    });
    if (response?.data && response?.data?.getTemplateBySlug) {
      metaTags = {
        title: response?.data?.getTemplateBySlug?.title || null,
        description: response?.data?.getTemplateBySlug?.description?.replace(regex, '') || null,
        image: response?.data?.getTemplateBySlug?.media[0]?.url || null,
      };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
  }
  return metaTags;
}

export async function getPageMetaTags(slug) {
  let metaTags = null;
  try {
    const regex = /(<([^>]+)>)/gi;
    const response = await guestClient.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug },
    });
    if (response?.data && response?.data?.getPageBySlug) {
      metaTags = {
        title: response?.data?.getPageBySlug?.title || null,
        description: response?.data?.getPageBySlug?.description?.replace(regex, '') || null,
        image: response?.data?.getPageBySlug?.media[0]?.url || null,
      };
    }
  } catch (error) {
    // console.log({ error });
  }
  return metaTags;
}

export function useLogoHook() {
  const dispatch = useDispatch();
  useEffect(() => {
    getLogo();
  }, []);
  const getLogo = async () => {
    let metaTags = {
      image: '',
      description: '',
      title: '',
    };
    const regex = /(<([^>]+)>)/gi;
    try {
      const response = await guestClient.query({
        query: GET_PAGE_BY_SLUG,
        variables: { slug: 'logo' },
      });
      if (response?.data && response?.data?.getPageBySlug) {
        const description = response?.data?.getPageBySlug?.description.replace(regex, '');
        metaTags = {
          title: response?.data?.getPageBySlug?.title ? response?.data?.getPageBySlug?.title : null,
          description: description || null,
          image:
            response?.data?.getPageBySlug?.media?.length >= 1
              ? response?.data?.getPageBySlug?.media[0]?.url
              : null,
        };
        dispatch(updateSettingAction({ metaTags }));
      }
    } catch (error) {
      // console.log(error);
    }
  };
}
