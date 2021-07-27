export const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
