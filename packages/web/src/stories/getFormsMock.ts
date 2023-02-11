import { GET_FORMS } from '@frontend/shared/graphql/query/form';

export const getFormsMock = [
  {
    request: {
      query: GET_FORMS,
      variables: { page: 1, limit: 10, search: '', showSearch: false, isWorkflow: false },
    },
    result: {
      data: {
        getForms: {
          count: 330,
          data: [
            {
              _id: '63a72842572907a65297b74d',
              name: 'Acceptance Criterias',
              slug: 'acceptance-criterias',
              fields: [
                { _id: '63a728428850fc11ffe0d934', __typename: 'Field2' },
                { _id: '63d198c5b5ccef415271625e', __typename: 'Field2' },
              ],
              createdBy: {
                _id: '629e24b250b4444d5927a894',
                values: [
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Sumithra',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Devi',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'mysumifoods@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd90689fa4870c25d387',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-12-24T16:26:42.828Z',
              __typename: 'Form',
            },
            {
              _id: '62b03d7cba5058cb9b86c3fc',
              name: 'Account',
              slug: 'account',
              fields: [
                { _id: '62b03d7c546a4bb692291fbe', __typename: 'Field2' },
                { _id: '6321fb78bca29078b7043f55', __typename: 'Field2' },
                { _id: '6328d6f14b5d6d55a9ecdb8e', __typename: 'Field2' },
              ],
              createdBy: {
                _id: '629e24b250b4444d5927a894',
                values: [
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Sumithra',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Devi',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'mysumifoods@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd90689fa4870c25d387',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-06-20T09:27:24.486Z',
              __typename: 'Form',
            },
            {
              _id: '6345c0f40c325c3acffce012',
              name: 'Action Form',
              slug: 'action-form',
              fields: [
                { _id: '6345c0f4c7da0b081624952a', __typename: 'Field2' },
                { _id: '6345c119e1b56eab02e9405c', __typename: 'Field2' },
                { _id: '6345c141d84452a44e3c9d4d', __typename: 'Field2' },
              ],
              createdBy: {
                _id: '629e24b250b4444d5927a894',
                values: [
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Sumithra',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Devi',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'mysumifoods@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd90689fa4870c25d387',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-10-11T19:16:04.800Z',
              __typename: 'Form',
            },
            {
              _id: '6318ba1bd7d8d831809ff94e',
              name: 'Action Permissions',
              slug: 'action-permissions',
              fields: [
                { _id: '6318ba1945fed56808c00a66', __typename: 'Field2' },
                { _id: '6318d51eaa1242eb4e33fa4d', __typename: 'Field2' },
                { _id: '631a1c9848c27390cb2d330c', __typename: 'Field2' },
              ],
              createdBy: {
                _id: '629e24b250b4444d5927a894',
                values: [
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Sumithra',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Devi',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'mysumifoods@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd90689fa4870c25d387',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-09-07T15:34:51.611Z',
              __typename: 'Form',
            },
            {
              _id: '634657931bb8c24b342b80ab',
              name: 'Action Variables',
              slug: 'action-variables',
              fields: [
                { _id: '6346579378dd427210528aab', __typename: 'Field2' },
                { _id: '634657a29ca4b08b630ac9e0', __typename: 'Field2' },
              ],
              createdBy: {
                _id: '6296a331515115becefc3f36',
                values: [
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Vivek',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Thakur',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'contactvivekvt@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-10-12T05:58:43.703Z',
              __typename: 'Form',
            },
            {
              _id: '634653671bb8c24b342b74b7',
              name: 'Actions 3',
              slug: 'actions-3',
              fields: [
                { _id: '634660abe552dfa41d3ea458', __typename: 'Field2' },
                { _id: '6346536688cccad4f2880ded', __typename: 'Field2' },
                { _id: '6346539a8852b33f7da2b307', __typename: 'Field2' },
                { _id: '634cef494de0309a81251930', __typename: 'Field2' },
                { _id: '634653b8b44536163ab06505', __typename: 'Field2' },
                { _id: '634655af08eec28257926419', __typename: 'Field2' },
                { _id: '634655c4bcd441e2487578f2', __typename: 'Field2' },
                { _id: '63466034be4e0a0dba357fec', __typename: 'Field2' },
                { _id: '6346a4ffd76b60d6e3e45fbc', __typename: 'Field2' },
                { _id: '63465e95bb4d60bc3852138a', __typename: 'Field2' },
                { _id: '634653d66de0e05a8de6a34d', __typename: 'Field2' },
                { _id: '634653e60b55a91088e2cf50', __typename: 'Field2' },
              ],
              createdBy: {
                _id: '6296a331515115becefc3f36',
                values: [
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Vivek',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Thakur',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'contactvivekvt@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-10-12T05:40:55.665Z',
              __typename: 'Form',
            },
            {
              _id: '62b0dc368ce3525d46b93e00',
              name: 'Activity Log',
              slug: 'activity-log',
              fields: [
                { _id: '62b0dc363a243dbf6de5ff4f', __typename: 'Field2' },
                { _id: '62b0dcf50150926894bae257', __typename: 'Field2' },
                { _id: '62b0dd1aacda983434898f31', __typename: 'Field2' },
              ],
              createdBy: {
                _id: '629e24b250b4444d5927a894',
                values: [
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Sumithra',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Devi',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'mysumifoods@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd90689fa4870c25d387',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-06-20T20:44:38.799Z',
              __typename: 'Form',
            },
            {
              _id: '63686d8320fac17631f16588',
              name: 'Activity Log Card',
              slug: 'activity-log-card',
              fields: [
                { _id: '63686d82662e8ed3d7b8f13a', __typename: 'Field2' },
                { _id: '6369db7a495e2111bdfb8f49', __typename: 'Field2' },
                { _id: '6369fc044ae4c7719625dd47', __typename: 'Field2' },
                { _id: '6369db9f95cb33a19e54af08', __typename: 'Field2' },
                { _id: '6369dbb6c1d0d56dc7678e0c', __typename: 'Field2' },
              ],
              createdBy: {
                _id: '629e24b250b4444d5927a894',
                values: [
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Sumithra',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Devi',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'mysumifoods@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd90689fa4870c25d387',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-11-07T02:29:23.138Z',
              __typename: 'Form',
            },
            {
              _id: '629d456f650932771c5a44e1',
              name: 'Add To favorite Schedule',
              slug: 'add-to-favorite-schedule',
              fields: [
                { _id: '629d456e7c1df42418cbde98', __typename: 'Field2' },
                { _id: '629d457f8683974e82042e45', __typename: 'Field2' },
              ],
              createdBy: {
                _id: '629e24b250b4444d5927a894',
                values: [
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Sumithra',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Devi',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'mysumifoods@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd90689fa4870c25d387',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-06-06T00:08:15.174Z',
              __typename: 'Form',
            },
            {
              _id: '62b0a780b74803a8bebb8f85',
              name: 'Address',
              slug: 'address',
              fields: [{ _id: '62b0a77f2e757668f1c55a9b', __typename: 'Field2' }],
              createdBy: {
                _id: '629e24b250b4444d5927a894',
                values: [
                  {
                    field: '6297c9d7d87f872dbe83b96d',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b0c0c34edd95d439b4',
                    value: 'Sumithra',
                    __typename: 'Value',
                  },
                  {
                    field: '6296a2b99a25767d06f4a8c9',
                    value: 'Devi',
                    __typename: 'Value',
                  },
                  {
                    field: '62969ff967ee716d1d052fea',
                    value: 'mysumifoods@gmail.com',
                    __typename: 'Value',
                  },
                  {
                    field: '62979114b9b08911857e479a',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd399181f4c2e0fb0e7b',
                    value: '',
                    __typename: 'Value',
                  },
                  {
                    field: '6297cd90689fa4870c25d387',
                    value: '',
                    __typename: 'Value',
                  },
                ],
                __typename: 'Response',
              },
              createdAt: '2022-06-20T16:59:44.302Z',
              __typename: 'Form',
            },
          ],
          __typename: 'Forms',
        },
      },
    },
  },
];
