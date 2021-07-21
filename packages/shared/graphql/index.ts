// /* eslint-disable import/prefer-default-export */
import { ApolloClient, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { AUTH_TYPE, createAuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import projectConfig from '../index';

const USE_DEBUG = process.env.NEXT_PUBLIC_USE_DEBUG_ENDPOINT === 'true';

const url = USE_DEBUG
  ? process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
  : projectConfig.appsyncGraphqlEndpoint;
const region = USE_DEBUG ? process.env.NEXT_PUBLIC_GRAPHQL_APIKEY : projectConfig.appsyncRegion;

const httpLink = new HttpLink({
  uri: url,
});

const jwtToken = async () => {
  try {
    return (await Auth.currentSession()).getIdToken().getJwtToken();
  } catch (e) {
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
          url: url,
        },
        httpLink,
      ),
    ),
  ]),
});
