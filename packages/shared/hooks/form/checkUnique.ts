import { GET_CHECK_UNIQUE } from '../../graphql/query/unique';
import { client as apolloClient } from '../../graphql';

export async function checkUnique(value, fieldId, _id) {
  try {
    const response = await apolloClient.query({
      query: GET_CHECK_UNIQUE,
      variables: { values: { value, fieldId }, _id },
    });
    return response;
  } catch (error) {
    alert({ error });
  }
}
