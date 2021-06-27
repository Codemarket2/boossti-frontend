// /* eslint-disable import/prefer-default-export */
import { ApolloClient, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { AUTH_TYPE, createAuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import awsConfig from '../aws-exports';

const httpLink = new HttpLink({
  uri: awsConfig.aws_appsync_graphqlEndpoint,
});

const url = awsConfig.aws_appsync_graphqlEndpoint;
const region = awsConfig.aws_appsync_region;

// let jwtToken = null;

const jwtToken = async () => {
  try {
    return (await Auth.currentSession()).getIdToken().getJwtToken();
  } catch (e) {
    // alert('Unauth');
    return null;
  }
};

const cognitoAuth: AuthOptions = {
  type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
  jwtToken: jwtToken,
};

const apiKeyAuth: AuthOptions = {
  type: AUTH_TYPE.API_KEY,
  apiKey: awsConfig.aws_appsync_apiKey,
};

const auth: AuthOptions = jwtToken ? cognitoAuth : apiKeyAuth;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    createAuthLink({
      url: url,
      auth: auth,
      region: region,
    }),
    split(
      (op) => {
        const { operation } = op.query.definitions[0] as any;

        if (operation === 'subscription') {
          return false;
        }

        return true;
      },
      httpLink,
      createSubscriptionHandshakeLink(
        {
          auth: auth,
          region: region,
          url: region,
        },
        httpLink,
      ),
    ),
  ]),
});

// import { createAuthLink } from 'aws-appsync-auth-link';
// import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
// import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
// import appSyncConfig from '../aws-exports';

// const url = appSyncConfig.aws_appsync_graphqlEndpoint;
// const region = appSyncConfig.aws_appsync_region;
// const auth = {
//   type: appSyncConfig.aws_appsync_authenticationType,
//   apiKey: appSyncConfig.aws_appsync_apiKey,
// };

// const httpLink = createHttpLink({ uri: url });

// const link = ApolloLink.from([
//   createAuthLink({ url, region, auth }),
//   // createSubscriptionHandshakeLink({ url, region, auth }),
//   createSubscriptionHandshakeLink(url, httpLink),
// ]);

// export const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache(),
// });
