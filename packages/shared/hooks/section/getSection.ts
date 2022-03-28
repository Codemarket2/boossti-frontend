import { useQuery, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_SECTION } from '../../graphql/query/section';
import { SECTION_SUB } from '../../graphql/subscription/section';

export function useGetSection(_id: string) {
  const { data, error, loading } = useQuery(GET_SECTION, {
    variables: { _id },
  });

  const [getSection, setGetSection] = useState(null);

  const { data: subscriptionData } = useSubscription(SECTION_SUB, {
    variables: { _id },
  });

  useEffect(() => {
    if (data && data.getSection) {
      setGetSection(parsePayload(data.getSection));
    }
  }, [data]);

  useEffect(() => {
    if (subscriptionData?.sectionSub) {
      const parsedForm = parsePayload(subscriptionData?.sectionSub);
      setGetSection({ ...getSection, ...parsedForm });
    }
  }, [subscriptionData]);

  return { data: getSection ? { getSection } : null, error, loading };
}

export const parsePayload = (payload) => {
  const newPayload = {
    ...payload,
  };
  if (newPayload?.fields) {
    newPayload.fields = newPayload?.fields?.map((m) => {
      const field = { ...m };
      field.options = JSON.parse(field.options);
      return field;
    });
  }
  if (newPayload?.options) {
    newPayload.options = JSON.parse(newPayload?.options);
  }
  if (newPayload?.settings) {
    newPayload.options = JSON.parse(newPayload?.options);
  }
  // if (newPayload?.values) {
  //   newPayload.values = parseValues(newPayload?.values);
  // }
  return newPayload;
};

// export const parseValues = (values) => {
//   return values?.map((m) => {
//     const value = { ...m };
//     value.options = JSON.parse(value.options);
//     return value;
//   });
// };
