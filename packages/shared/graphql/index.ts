// /* eslint-disable import/prefer-default-export */
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { AUTH_TYPE, createAuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import projectConfig from '../index';

const USE_DEBUG = process.env.NEXT_PUBLIC_USE_DEBUG_ENDPOINT === 'true';

const url = USE_DEBUG
  ? process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
  : projectConfig.appsyncGraphqlEndpoint;
const region = USE_DEBUG ? process.env.NEXT_PUBLIC_GRAPHQL_APIKEY : projectConfig.appsyncRegion;

const cognitoAuth: AuthOptions = {
  type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
  jwtToken: async () => {
    try {
      return (await Auth.currentSession()).getIdToken().getJwtToken();
    } catch (e) {
      return null;
    }
  },
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth: cognitoAuth }),
  createSubscriptionHandshakeLink({ url, region, auth: cognitoAuth }),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const apiKeyAuth: AuthOptions = {
  type: AUTH_TYPE.API_KEY,
  apiKey: projectConfig.appsyncApiKey,
};

const guestLink = ApolloLink.from([
  createAuthLink({ url, region, auth: apiKeyAuth }),
  createSubscriptionHandshakeLink({ url, region, auth: apiKeyAuth }),
]);

export const guestClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: guestLink,
});
