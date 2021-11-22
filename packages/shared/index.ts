import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GET_LIST_TYPE_BY_SLUG, GET_LIST_ITEM_BY_SLUG } from './graphql/query/list';
import { guestClient } from './graphql';
import { updateSettingAction } from '../shared/redux/actions/setting';

interface IProjectConfig {
  title: string;
  description: string;
  image: string;
  url: string;
  stripePublishableKey: string;
  defaultProfile: string;
  oneSignalAppId: string;
  appsyncGraphqlEndpoint: string;
  appsyncRegion: string;
  appsyncApiKey: string;
}

const projectConfig: IProjectConfig = {
  title: 'Vijaa',
  description: 'Learn, Share & Get Well Soon, Stories about prevention and survival.',
  image:
    'https://vijaa-content-bucket202938-dev.s3.amazonaws.com/public/media/default/vijaalogo.jpeg',
  url: 'https://vijaa.com',
  stripePublishableKey:
    'pk_test_517LnJnDPrb5EfwdRchW3z9AVO6xddwRZtSHqD311B4HW5j9Ouh9dmzU6UDiwH5Hwgh7jWSaqiQn7phQGitMPS0C500jhmK4yHw',
  defaultProfile:
    'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
  oneSignalAppId: '39d662b6-c57e-4b00-bab7-df62ceaee266',
  appsyncGraphqlEndpoint:
    'https://cow33tgsh5cntohwurp3aosbca.appsync-api.us-east-1.amazonaws.com/graphql',
  appsyncApiKey: 'da2-g22usoh4dza4zou6qxdyt2cg3q',
  appsyncRegion: 'us-east-1',
};

export async function getMetaTags(slug) {
  let metaTags = null;

  const regex = /(<([^>]+)>)/gi;
  try {
    const response = await guestClient.query({
      query: GET_LIST_TYPE_BY_SLUG,
      variables: { slug },
    });
    if (response?.data && response?.data?.getListTypeBySlug) {
      const description = response?.data?.getListTypeBySlug?.description.replace(regex, '');
      metaTags = {
        title: response?.data?.getListTypeBySlug?.title
          ? response?.data?.getListTypeBySlug?.title
          : null,
        description: description || null,
        image:
          response?.data?.getListTypeBySlug?.media?.length >= 1
            ? response?.data?.getListTypeBySlug?.media[0]?.url
            : null,
      };
    }
  } catch (error) {
    console.log(error);
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
          description: description ? description : null,
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

export default projectConfig;
