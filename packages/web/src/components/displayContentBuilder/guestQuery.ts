import { guestClient } from '@frontend/shared/graphql';
export const guestQuery = async (QUERY, queryVariables, setState) => {
  try {
    const response = await guestClient.query({
      query: QUERY,
      variables: queryVariables,
    });
    setState(response);
  } catch (error) {
    return console.log(error.message);
  }
};
