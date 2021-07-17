// /* eslint-disable import/prefer-default-export */
import { ApolloClient, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { AUTH_TYPE, createAuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import projectConfig from '../index';

const httpLink = new HttpLink({
  uri: projectConfig.appsyncGraphqlEndpoint,
});

const url = projectConfig.appsyncGraphqlEndpoint;
const region = projectConfig.appsyncRegion;

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
  apiKey: projectConfig.appsyncApiKey,
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
