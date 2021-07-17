import OneSignal from 'react-native-onesignal';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import projectConfig from '@frontend/shared';

export const useOneSignal = () => {
  const { authenticated, attributes } = useSelector(({ auth }: any) => auth);
  useEffect(() => {
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(projectConfig.oneSignalAppId);
    //END OneSignal Init Code

    //Prompt for push on iOS
    if (Platform.OS === 'ios') {
      OneSignal.promptForPushNotificationsWithUserResponse((response) => {
        console.log('Prompt response:', response);
      });
    }

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
      console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log('OneSignal: notification opened:', notification);
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
