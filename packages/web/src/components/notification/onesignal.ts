import OneSignal from 'react-onesignal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useOneSignal = () => {
  const { authenticated, attributes } = useSelector(({ auth }: any) => auth);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID) {
      setInitialized(true);
      OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
        safari_web_id: 'web.onesignal.auto.235723f6-f2ef-49f2-bb5e-e966332d4e54',
      });
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      if (authenticated && attributes['custom:_id']) {
        OneSignal.setExternalUserId(attributes['custom:_id']);
      } else {
        OneSignal.removeExternalUserId();
      }
    }
  }, [authenticated]);

  return null;
};
