/* eslint-disable prefer-const */
import { useEffect, useState } from 'react';

export function useFacebookSDK() {
  const [fbsdk, setFbsdk] = useState({ fbsdkLoading: false, fbsdkConnected: false });

  useEffect(() => {
    setFbsdk({ ...fbsdk, fbsdkLoading: true });
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '496030015019232',
        xfbml: true,
        version: 'v11.0',
      });
      getLoginStatus();
    };

    if (window.document.getElementById('facebook-jssdk')) {
      getLoginStatus();
    }

    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const getLoginStatus = () => {
    window.FB.getLoginStatus(({ authResponse }) => {
      if (authResponse) {
        setFbsdk({ ...fbsdk, fbsdkLoading: false, fbsdkConnected: true });
      } else {
        setFbsdk({ ...fbsdk, fbsdkLoading: false, fbsdkConnected: false });
      }
    });
  };

  const handleLogin = () => {
    window.FB.login(
      (response) => {
        if (!response || !response.authResponse) {
          return;
        }
        setFbsdk({ ...fbsdk, fbsdkLoading: false, fbsdkConnected: true });
        localStorage.removeItem('selectedGroups');
      },
      {
        scope:
          'public_profile,email,user_managed_groups,publish_to_groups,groups_access_member_info',
        return_scopes: true,
      },
    );
  };
  const handleLogout = () => {
    window.FB.logout(function (response) {
      setFbsdk({ ...fbsdk, fbsdkLoading: false, fbsdkConnected: false });
      localStorage.removeItem('selectedGroups');
    });
  };

  return { fbsdk, handleLogin, handleLogout };
}
