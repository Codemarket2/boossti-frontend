import React from 'react';
import UserLayout from '../src/components/common/UserLayout';
// import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import Typography from '@material-ui/core/Typography';

// const GET_ONE = gql`
//   query QUERY($userId: String!) {
//     getUserByCognitoUserId(userId: $userId) {
//       subscription {
//         _id
//         active
//         amount
//         description
//         expiringOn
//         subscribedOn
//         subscriptionType
//       }
//       _id
//       active
//       confirmed
//       createdAt
//       createdBy
//       email
//       name
//       picture
//       updatedAt
//       updatedBy
//       userId
//     }
//   }
// `;

export const GET_ALL = gql`
  query getUsers($limit: Int!, $page: Int!) {
    getUsers(limit: $limit, page: $page) {
      count
      users {
        _id
        active
        confirmed
        email
        name
        picture
        userId
        createdAt
      }
    }
  }
`;

export default function HomePage() {
  // const router = useRouter();
  // const { initial, authenticated } = useSelector(({ auth }: any) => auth);

  // if (initial && !authenticated) {
  //   router.push('/auth');
  // }

  const { data, error, loading } = useQuery(GET_ALL, {
    variables: { limit: 10, page: 1 },
  });

  console.log('useQuery', data, error, loading);

  return (
    <UserLayout redirectPath="sample" authRequired>
      <Typography variant="h4">Sample</Typography>
    </UserLayout>
  );
}
