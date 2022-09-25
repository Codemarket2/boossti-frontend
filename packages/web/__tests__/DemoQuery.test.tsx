import { MockedProvider } from '@apollo/client/testing';
import { GET_FORM_BY_SLUG } from '@frontend/shared/graphql/query/form';
import { GET_RESPONSES } from '@frontend/shared/graphql/query/response';
import { fireEvent, render, screen, act, waitFor } from '../jest/test-utils';
import DemoQuery, { variables } from '../__mocks__/DemoQuery';

const DemoQueryTest = () => {
  return <DemoQuery />;
};

const mocks = [
  {
    request: {
      query: GET_RESPONSES,
      variables,
    },
    result: {
      data: {
        getResponses: {
          __typename: 'Responses',
          count: 2,
          data: [
            {
              __typename: 'Response',
              _id: '62f6a72a44ae9b971d1326bb',
              formId: '62f687f8af282a8147d7fd8c',
              count: 2,
              appId: null,
              workFlowFormResponseParentId: null,
              values: [
                {
                  __typename: 'Value',
                  _id: '62f6a72a44ae9b971d1326bc',
                  field: '62f687f71a2c53f7da064729',
                  value: 'arjavsethi07@gmail.com',
                  values: [],
                  valueNumber: null,
                  valueBoolean: null,
                  valueDate: null,
                  media: [],
                  template: null,
                  page: null,
                  form: null,
                  response: null,
                  options: '{"option":false}',
                },
                {
                  __typename: 'Value',
                  _id: '62f6a72a44ae9b971d1326bd',
                  field: '62f68825313400a1609bc1db',
                  value: 'sadasdad',
                  values: [],
                  valueNumber: null,
                  valueBoolean: null,
                  valueDate: null,
                  media: [],
                  template: null,
                  page: null,
                  form: null,
                  response: null,
                  options: '{"option":false}',
                },
              ],
              createdBy: {
                __typename: 'Response',
                _id: '62e41f9ac1e9cdab76f3804b',
                count: 23,
                values: [
                  { __typename: 'Value', field: '6296a2b0c0c34edd95d439b4', value: 'Arjav' },
                  { __typename: 'Value', field: '6296a2b99a25767d06f4a8c9', value: 'Sethi' },
                  {
                    __typename: 'Value',
                    field: '62969ff967ee716d1d052fea',
                    value: 'arjavsethi07@gmail.com',
                  },
                ],
              },
              createdAt: '2022-08-12T19:16:58.640Z',
              options: '{"option":false}',
            },
            {
              __typename: 'Response',
              _id: '62f688d7399312bdbec4634c',
              formId: '62f687f8af282a8147d7fd8c',
              count: 1,
              appId: null,
              workFlowFormResponseParentId: null,
              values: [
                {
                  __typename: 'Value',
                  _id: '62f688d7399312bdbec4634d',
                  field: '62f687f71a2c53f7da064729',
                  value: 'arjav',
                  values: [],
                  valueNumber: null,
                  valueBoolean: null,
                  valueDate: null,
                  media: [],
                  template: null,
                  page: null,
                  form: null,
                  response: null,
                  options: '{"option":false}',
                },
                {
                  __typename: 'Value',
                  _id: '62f688d7399312bdbec4634e',
                  field: '62f68825313400a1609bc1db',
                  value: 'adsasd',
                  values: [],
                  valueNumber: null,
                  valueBoolean: null,
                  valueDate: null,
                  media: [],
                  template: null,
                  page: null,
                  form: null,
                  response: null,
                  options: '{"option":false}',
                },
              ],
              createdBy: {
                __typename: 'Response',
                _id: '62e41f9ac1e9cdab76f3804b',
                count: 23,
                values: [
                  { __typename: 'Value', field: '6296a2b0c0c34edd95d439b4', value: 'Arjav' },
                  { __typename: 'Value', field: '6296a2b99a25767d06f4a8c9', value: 'Sethi' },
                  {
                    __typename: 'Value',
                    field: '62969ff967ee716d1d052fea',
                    value: 'arjavsethi07@gmail.com',
                  },
                ],
              },
              createdAt: '2022-08-12T17:07:35.373Z',
              options: '{"option":false}',
            },
          ],
        },
      },
    },
  },
];
describe('DemoQuery', () => {
  it('Checks rendering of demo query', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DemoQueryTest />
      </MockedProvider>,
    );
    // await waitFor(() => {
    //   expect(screen.getByTestId('demoQuery')).toHaveTextContent('Arjav Sethi');
    // });
    // setTimeout(() => {
    //   // screen.findByText('Arjav Sethi');

    // }, 5000);
    // await new Promise((r) => setTimeout(r, 3000));

    const demoQuery = await screen.findByTestId('demoQuery');
    expect(demoQuery).toBeInTheDocument();
    expect(demoQuery).toHaveTextContent('62f6a72a44ae9b971d1326bb');
  });
});
