import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth } from 'aws-amplify';

const DEVELOPMENT_MODE = false;

const productionUri = 'https://jy2h0lqya4.execute-api.us-east-1.amazonaws.com/dev/graphql';
const developmentUri = 'http://localhost:3030/dev/graphql';

const graphqlUri = DEVELOPMENT_MODE ? developmentUri : productionUri;

const httpLink = createHttpLink({
  uri: graphqlUri,
});

const jwtToken = async () => {
  try {
    return (await Auth.currentSession()).getIdToken().getJwtToken();
  } catch (e) {
    return null;
  }
};

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await jwtToken();
  console.log(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
