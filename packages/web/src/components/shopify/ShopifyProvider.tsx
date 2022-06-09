import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Provider as AppBridgeProvider, useAppBridge } from '@shopify/app-bridge-react';
import { checkValidShop } from '@frontend/shared/hooks/shopify/checkValidShop';
import { getShopResponse } from '@frontend/shared/hooks/shopify/getShopResponse';
import { getSessionToken } from '@shopify/app-bridge-utils';
import Loading from '../common/Loading';
import NotFound from '../common/NotFound';

interface IProps {
  children: React.ReactNode;
  apiKey: string;
  template?: any;
}

export default function ShopifyProvider({ children, apiKey, template }: IProps) {
  const [host, setHost] = useState('');

  const getHost = async () => {
    const url = new URL(window.location.href);
    const hostValue = url.searchParams.get('host');
    const shop = url.searchParams.get('shop');
    const res: any = await checkValidShop(shop);

    if (res && !res?.shopIsValidated) {
      window.location.replace(res?.redirectUrl);
    }
    // If host is not set, than the page is being loaded outside of App Bridge
    // so we should proceed with starting OAuth
    if (hostValue) {
      setHost(hostValue);
    } else {
      window.location.replace(res?.redirectUrl);
    }
  };

  useEffect(() => {
    getHost();
  }, []);

  return (
    <>
      {host ? (
        <AppBridgeProvider
          config={{
            apiKey,
            host,
            forceRedirect: true,
          }}
        >
          <Shopify template={template}>{children}</Shopify>
        </AppBridgeProvider>
      ) : (
        <Loading />
      )}
    </>
  );
}

interface IProps2 {
  children: ReactNode;
  template?: any;
}

const Shopify = ({ children, template }: IProps2) => {
  const app = useAppBridge();
  const router = useRouter();
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const url = new URL(window.location.href);
      const shop = url.searchParams.get('shop');
      const sessionToken = await getSessionToken(app);
      if (template?._id) {
        const defaultWidget = template?.fields?.find((field) => field?.options?.default);
        const response = await getShopResponse({ shop, formId: defaultWidget?.form?._id });
        const instanceUrl = `/${template?.slug}/${response?.count}`;
        router.push(instanceUrl);
      } else {
        setToken(sessionToken);
      }
    } catch (error) {
      setToken('error');
    }
  };

  useEffect(() => {
    if (app) {
      getToken();
    }
  }, [app]);

  return <>{token === '' ? <Loading /> : token === 'error' ? <NotFound /> : children}</>;
};
