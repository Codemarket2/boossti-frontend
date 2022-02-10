import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GET_LIST_TYPE_BY_SLUG, GET_LIST_ITEM_BY_SLUG } from '../graphql/query/list';
import { guestClient } from '../graphql';
import { updateSettingAction } from '../redux/actions/setting';

export async function getListTypeMetaTags(slug) {
  let metaTags = null;
  try {
    const regex = /(<([^>]+)>)/gi;
    const response = await guestClient.query({
      query: GET_LIST_TYPE_BY_SLUG,
      variables: { slug },
    });
    if (response?.data && response?.data?.getListTypeBySlug) {
      metaTags = {
        title: response?.data?.getListTypeBySlug?.title || null,
        description: response?.data?.getListTypeBySlug?.description?.replace(regex, '') || null,
        image: response?.data?.getListTypeBySlug?.media[0]?.url || null,
      };
    }
  } catch (error) {
    console.log({ error });
  }
  return metaTags;
}

export async function getListItemMetaTags(slug) {
  let metaTags = null;
  try {
    const regex = /(<([^>]+)>)/gi;
    const response = await guestClient.query({
      query: GET_LIST_ITEM_BY_SLUG,
      variables: { slug },
    });
    if (response?.data && response?.data?.getListItemBySlug) {
      metaTags = {
        title: response?.data?.getListItemBySlug?.title || null,
        description: response?.data?.getListItemBySlug?.description?.replace(regex, '') || null,
        image: response?.data?.getListItemBySlug?.media[0]?.url || null,
      };
    }
  } catch (error) {
    console.log({ error });
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
        query: GET_LIST_ITEM_BY_SLUG,
        variables: { slug: 'logo' },
      });
      if (response?.data && response?.data?.getListItemBySlug) {
        const description = response?.data?.getListItemBySlug?.description.replace(regex, '');
        metaTags = {
          title: response?.data?.getListItemBySlug?.title
            ? response?.data?.getListItemBySlug?.title
            : null,
          description: description || null,
          image:
            response?.data?.getListItemBySlug?.media?.length >= 1
              ? response?.data?.getListItemBySlug?.media[0]?.url
              : null,
        };
        dispatch(updateSettingAction({ metaTags }));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
