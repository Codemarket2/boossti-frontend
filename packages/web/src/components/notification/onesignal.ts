import OneSignal from 'react-onesignal';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useOneSignal = () => {
  const { authenticated, attributes } = useSelector(({ auth }: any) => auth);

  useEffect(() => {
    OneSignal.init({
      appId: process.env.ONE_SIGNAL_APP_ID || 'd7a822b5-a821-460f-a60a-86d08d19e8f0', //deployed api key will be replaced by env
      safari_web_id: 'web.onesignal.auto.235723f6-f2ef-49f2-bb5e-e966332d4e54',
    });
  }, []);
  useEffect(() => {
    if (authenticated) {
      OneSignal.setExternalUserId(attributes['custom:_id']);
    } else {
      OneSignal.removeExternalUserId();
    }
  }, [authenticated]);
  return null;
};
