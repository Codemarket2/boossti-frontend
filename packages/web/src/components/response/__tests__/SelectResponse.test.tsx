// import { within } from '@testing-library/dom';
// import { wait } from '@testing-library/user-event/dist/types/utils';
import { MockedProvider } from '@apollo/client/testing';
import { GET_RESPONSES } from '@frontend/shared/graphql/query/response';
import { useGetResponses } from '@frontend/shared/hooks/response';
import SelectResponse, { IProps } from '../SelectResponse';
import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';

const getInitialProps = (): IProps => {
  return {
    label: 'text * response',
    formId: '62f687f8af282a8147d7fd8c',
    instanceId: undefined,
    value: null,
    onChange: jest.fn(),
    onChangeFullResponse: jest.fn(),
    error: false,
    helperText: null,
    disabled: false,
    formField: '62f687f71a2c53f7da064729',
    openDrawer: jest.fn(),
    allowCreate: true,
    onlyMyResponses: false,
  };
};
const variables = {
  formId: '62f687f8af282a8147d7fd8c',
  workFlowFormResponseParentId: null,
  page: 1,
  limit: 10,
  search: '',
  formField: null,
  onlyMy: false,
  instanceId: '',
  valueFilter: null,
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
              instanceId: null,
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
              instanceId: null,
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
const SelectResponseTest = ({
  label,
  formId,
  instanceId,
  value = null,
  onChange,
  onChangeFullResponse,
  error = false,
  helperText,
  disabled,
  formField,
  openDrawer,
  allowCreate,
  onlyMyResponses,
}: IProps) => {
  return (
    <SelectResponse
      label={label}
      formId={formId}
      instanceId={instanceId}
      value={value}
      onChange={onChange}
      onChangeFullResponse={onChangeFullResponse}
      error={error}
      helperText={helperText}
      disabled={disabled}
      formField={formField}
      openDrawer={openDrawer}
      allowCreate={allowCreate}
      onlyMyResponses={onlyMyResponses}
    />
  );
};

describe('Select Response', () => {
  it('checks rendering of select response and auto-complete', () => {
    const props = getInitialProps();
    render(<SelectResponseTest {...props} />);
    const select = screen.getByTestId('selectResponse');
    expect(select).toBeInTheDocument();
  });

  it(' checks rendering of text field ', () => {
    const props = getInitialProps();
    render(<SelectResponseTest {...props} />);
    const textField = screen.getByTestId('TextField');
    expect(textField).toBeInTheDocument();
  });

  // it('checks rendering of autocomplete', async () => {
  //   const props = getInitialProps();
  //   render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <SelectResponseTest {...props} />
  //     </MockedProvider>,
  //   );
  //   const autoComplete = screen.getByTestId('Autocomplete');
  //   const input = within(autoComplete).getByRole('combobox') as HTMLInputElement;

  //   fireEvent.click(input);
  //   // fireEvent.change(input, { target: { value: 'arav' } });
  //   await new Promise((r) => setTimeout(r, 3000));
  //   const presentation = screen.findByRole('presentation');

  //   // expect((await presentation).textContent).toBe('add "arav"');
  //   fireEvent.keyDown(autoComplete, { key: 'ArrowDown' });
  //   fireEvent.keyDown(autoComplete, { key: 'Enter' });
  //   const CreateResponseDrawer = screen.getByTestId('CreateResponseDrawer');
  //   expect(CreateResponseDrawer).toBeInTheDocument();
  // });

  // it('checks rendering of autocomplete', () => {
  //   const props = getInitialProps();
  //   render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <SelectResponseTest {...props} />
  //     </MockedProvider>,
  //   );
  // });
});
