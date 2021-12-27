import OneSignal from 'react-onesignal';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useOneSignal = () => {
  const { authenticated, attributes } = useSelector(({ auth }: any) => auth);
  useEffect(() => {
    OneSignal.init({
      appId: 'd7a822b5-a821-460f-a60a-86d08d19e8f0', //deployed api key will be replaced by env
    });
  }, []);
  useEffect(() => {
    if (authenticated) {
      OneSignal.setExternalUserId(attributes.sub);
    } else {
      OneSignal.removeExternalUserId();
    }
  }, [authenticated]);
  return null;
};
