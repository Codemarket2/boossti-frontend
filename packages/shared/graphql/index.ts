// /* eslint-disable import/prefer-default-export */
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { AUTH_TYPE, createAuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import projectConfig from '../index';

let url = projectConfig.appsyncGraphqlEndpoint;
let region = projectConfig.appsyncRegion;
let apiKey = projectConfig.appsyncRegion;

if (
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_USE_DEBUG_ENDPOINT === 'true' &&
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT &&
  process.env.NEXT_PUBLIC_GRAPHQL_APIKEY
) {
  // console.log('Use debug endpoint');
  url = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  apiKey = process.env.NEXT_PUBLIC_GRAPHQL_APIKEY;
} else if (
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT &&
  process.env.NEXT_PUBLIC_GRAPHQL_APIKEY
) {
  // console.log('Use prod endpoint');
  url = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  apiKey = process.env.NEXT_PUBLIC_GRAPHQL_APIKEY;
}

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
  apiKey: apiKey,
};

const guestLink = ApolloLink.from([
  createAuthLink({ url, region, auth: apiKeyAuth }),
  createSubscriptionHandshakeLink({ url, region, auth: apiKeyAuth }),
]);

export const guestClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: guestLink,
});
