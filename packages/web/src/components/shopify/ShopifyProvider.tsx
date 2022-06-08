import React, { useEffect } from 'react';
import { Provider as AppBridgeProvider, useAppBridge } from '@shopify/app-bridge-react';
import { userLoggedInFetch } from './userLoggedInFetch';

interface IProps {
  children: React.ReactNode;
  apiKey: string;
  host: string;
}

export default function ShopifyProvider({ children, apiKey, host }: IProps) {
  const app = useAppBridge();

  useEffect(() => {
    if (app) {
      userLoggedInFetch(app);
    }
  }, [app]);

  return (
    <AppBridgeProvider
      config={{
        apiKey,
        host,
        forceRedirect: true,
      }}
    >
      {children}
    </AppBridgeProvider>
  );
}
