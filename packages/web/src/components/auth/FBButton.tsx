// import React, { useEffect } from 'react';
// import { Auth } from 'aws-amplify';
// import Button from '@material-ui/core/Button';
// import Facebook from '@material-ui/icons/Facebook';
// // To federated sign in from Facebook

// const SignInWithFacebook = () => {
//   useEffect(() => {
//     if (!window.FB) createScript();
//   }, []);

//   const handleSignIn = () => {
//     const fb = window.FB;
//     fb.getLoginStatus((response) => {
//       if (response.status === 'connected') {
//         getAWSCredentials(response.authResponse);
//       } else {
//         fb.login(
//           (response) => {
//             if (!response || !response.authResponse) {
//               return;
//             }
//             getAWSCredentials(response.authResponse);
//           },
//           {
//             // the authorized scopes
//             scope: 'public_profile,email',
//           },
//         );
//       }
//     });
//   };

//   const getAWSCredentials = (response) => {
//     const { accessToken, expiresIn } = response;
//     const date = new Date();
//     const expires_at = expiresIn * 1000 + date.getTime();
//     if (!accessToken) {
//       return;
//     }

//     const fb = window.FB;
//     fb.api('/me', { fields: 'name,email' }, (response) => {
//       const user = {
//         name: response.name,
//         email: response.email,
//       };

//       console.log('user', user);

//       Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, user).then(
//         (credentials) => {
//           console.log('Auth.federatedSignIn', credentials);
//         },
//       );
//     });
//   };

//   const createScript = () => {
//     // load the sdk
//     window.fbAsyncInit = fbAsyncInit;
//     const script = document.createElement('script');
//     script.src = 'https://connect.facebook.net/en_US/sdk.js';
//     script.async = true;
//     script.onload = initFB;
//     document.body.appendChild(script);
//   };

//   const initFB = () => {
//     const fb = window.FB;
//     console.log('FB SDK initialized');
//   };

//   const fbAsyncInit = () => {
//     // init the fb sdk client
//     const fb = window.FB;
//     fb.init({
//       appId: '367361677933011',
//       cookie: true,
//       xfbml: true,
//       version: 'v2.11',
//     });
//   };

//   return (
//     <Button
//       startIcon={<Facebook />}
//       data-testid="facebook-signin-button"
//       fullWidth
//       style={{ backgroundColor: '#4267B2', color: 'white' }}
//       type="button"
//       variant="contained"
//       onClick={handleSignIn}>
//       Facebook Native
//     </Button>
//   );
// };

// export default SignInWithFacebook;

import React from 'react';

export default function FBButton() {
  return <div>FBButton</div>;
}
