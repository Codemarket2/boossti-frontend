import { gql } from '@apollo/client';

export const GET_MY_POSTS = gql`
  query MyQuery($limit: Int, $page: Int, $search: String) {
    getMyPosts(limit: $limit, page: $page, search: $search) {
      count
      data {
        _id
        body
        media {
          url
          caption
        }
        tags {
          tag {
            _id
            title
            slug
            description
            media {
              url
              caption
            }
            types {
              _id
              slug
            }
          }
        }
        createdAt
        createdBy {
          _id
          name
          picture
        }
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query MyQuery($userId: ID!, $limit: Int, $page: Int, $search: String) {
    getPostsByUserId(userId: $userId, limit: $limit, page: $page, search: $search) {
      count
      data {
        _id
        body
        media {
          url
          caption
        }
        tags {
          tag {
            _id
            title
            slug
            description
            media {
              url
              caption
            }
            types {
              _id
              slug
            }
          }
        }
        createdAt
        createdBy {
          _id
          name
          picture
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query MyQuery($limit: Int, $page: Int, $search: String) {
    getPosts(limit: $limit, page: $page, search: $search) {
      count
      data {
        _id
        body
        media {
          url
          caption
        }
        tags {
          tag {
            _id
            title
            slug
            description
            media {
              url
              caption
            }
            types {
              _id
              slug
            }
          }
        }
        createdAt
        createdBy {
          _id
          name
          picture
        }
      }
    }
  }
`;
// export const GET_POST = gql`
//   query MyQuery($_id: !ID) {
//     getPost(_id:$_id) {
//         _id
//         body
//         media {
//           url
//           caption
//         }
//         tags {
//           tag {
//             _id
//             title
//             slug
//             description
//             media {
//               url
//               caption
//             }
//             types {
//               _id
//               slug
//             }
//           }
//         }
//         createdAt
//         createdBy {
//           _id
//           name
//           picture
//         }
//     }
//   }
// `;

export const GET_POST = gql`
  query MyQuery($_id: ID!) {
    getPost(_id: $_id) {
      _id
      body
      media {
        url
        caption
      }
      tags {
        tag {
          _id
          title
          slug
          description
          media {
            url
            caption
          }
          types {
            _id
            slug
          }
        }
      }
      createdAt
      createdBy {
        _id
        name
        picture
      }
    }
  }
`;
