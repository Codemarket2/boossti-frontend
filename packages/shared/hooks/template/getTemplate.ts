import { client as apolloClient } from '../../graphql';
import { GET_TEMPLATE_BY_SLUG } from '../../graphql/query/template';

export async function getTemplateBySlug(slug: string) {
  const template = await apolloClient.query({
    query: GET_TEMPLATE_BY_SLUG,
    variables: { slug },
  });
  return template;
}
