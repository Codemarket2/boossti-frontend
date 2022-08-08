import { getElementById } from 'domutils';
import { DisplayResponse } from '../DisplayResponse';
import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';
import { IForm, IResponse } from '@frontend/shared/types';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';

import moment from 'moment';

const getInitialProps = () => {
  return {
    form: {
      __typename: 'Form',
      _id: '62e57ddf0cf0f97ecde0c120',
      name: 'ARJAV SETHI',
      slug: 'arjav-sethi',
      createdBy: 'arjav-sethi',
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: 'arjav-sethi',
      fields: [
        {
          __typename: 'Field2',
          _id: '62e57dde50144a579a210ea3',
          label: 'delete later',
          fieldType: 'flowDiagram',
          options: {
            physicalQuantity: '',
            unit: '',
            default: true,
            selectItem: false,
            dependentRelationship: false,
            twoWayRelationship: false,
            relationLabel: '',
            relationFieldId: '',
            showOptionCreatedByUser: false,
            showOptionCreatedOnTemplate: false,
            required: true,
            multipleValues: false,
            unique: false,
            caseInsensitiveUnique: false,
            staticText: '',
            formField: '',
            showCommentBox: false,
            showStarRating: false,
            notEditable: false,
            systemCalculatedAndSaved: false,
            systemValue: null,
            systemCalculatedAndView: false,
            formula: null,
            showAsCheckbox: false,
            selectAllowCreate: false,
            selectOptions: [''],
            conditions: [],
            defaultValue: null,
          },
          template: null,
          form: null,
        },
      ],
      settings: { published: false },
    },
    response: {
      __typename: 'Response',
      _id: '62ee9a9ea90f7bfd19a4e372',
      formId: '62e57ddf0cf0f97ecde0c120',
      count: 9,
      appId: null,
      installId: null,
      workFlowFormResponseParentId: null,
      values: [
        {
          __typename: 'Value',
          _id: '62ee9a9ea90f7bfd19a4e373',
          field: '62e57dde50144a579a210ea3',
          value: '',
          values: [],
          valueNumber: null,
          valueBoolean: null,
          valueDate: null,
          media: [],
          template: null,
          page: null,
          form: null,
          response: null,
          options:
            '{"flowDiagram":{"nodes":[{"id":"62ee9a98944d925e0a9731dd","type":"customNode2","position":{"x":613.390625,"y":182},"data":{"formId":"62e57ddf0cf0f97ecde0c120","label":"ARJAV SETHI","ports":[{"_id":"62ee9a98e0104cd4b5f2ca9c","position":"top","type":"target"},{"_id":"62ee9a980e40b7b8904a5bee","position":"bottom","type":"source"},{"_id":"62ee9a98acb1b0c1a6c4ad77","position":"left","type":"target"},{"_id":"62ee9a98233fbbf0b0acfb82","position":"right","type":"source"}]},"width":120,"height":39},{"id":"62ee9a994f0fab178d85dbf1","type":"customNode2","position":{"x":677.0859375,"y":135.25},"data":{"formId":"62b03d7cba5058cb9b86c3fc","label":"Account","ports":[{"_id":"62ee9a99d2c9fcc023f1eb23","position":"top","type":"target"},{"_id":"62ee9a991d82e197a4ac61f7","position":"bottom","type":"source"},{"_id":"62ee9a996dc30662a5676912","position":"left","type":"target"},{"_id":"62ee9a99ca4b1071add25301","position":"right","type":"source"}]},"width":120,"height":39},{"id":"62eea735097b1c0e3dc90cc9","type":"customNode2","position":{"x":772.93359375,"y":80.875},"data":{"formId":"62e57ddf0cf0f97ecde0c120","label":"ARJAV SETHI","ports":[{"_id":"62eea73586bc7cfe9c79a1ec","position":"top","type":"target"},{"_id":"62eea7352a32243724adcf6f","position":"bottom","type":"source"},{"_id":"62eea73531ad69938d3f90fc","position":"left","type":"target"},{"_id":"62eea73598c10c15121403c7","position":"right","type":"source"}]},"width":120,"height":39}],"edges":[{"source":"62ee9a994f0fab178d85dbf1","sourceHandle":"62ee9a991d82e197a4ac61f7","target":"62ee9a98944d925e0a9731dd","targetHandle":"62ee9a98e0104cd4b5f2ca9c","markerEnd":{"type":"arrowclosed","color":"#808080"},"animated":true,"type":"customEdge","style":{"stroke":"#808080"},"id":"reactflow__edge-62ee9a994f0fab178d85dbf162ee9a991d82e197a4ac61f7-62ee9a98944d925e0a9731dd62ee9a98e0104cd4b5f2ca9c"},{"source":"62eea735097b1c0e3dc90cc9","sourceHandle":"62eea7352a32243724adcf6f","target":"62ee9a994f0fab178d85dbf1","targetHandle":"62ee9a99d2c9fcc023f1eb23","markerEnd":{"type":"arrowclosed","color":"#808080"},"animated":true,"type":"customEdge","style":{"stroke":"#808080"},"id":"reactflow__edge-62eea735097b1c0e3dc90cc962eea7352a32243724adcf6f-62ee9a994f0fab178d85dbf162ee9a99d2c9fcc023f1eb23"}]}}',
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
      createdAt: new Date(),
      options: '{"option":false}',
      updatedAt: new Date(),
      updatedBy: 'arjav sethi',
    },
    hideBreadcrumbs: false,
    hideNavigation: false,
    hideAuthor: false,
    hideWorkflow: false,
    deleteCallBack: () => null,
    isAuthorized: true,
    hideDelete: false,
  };
};

const DisplyResponseTest = ({
  form,
  response,
  hideBreadcrumbs,
  hideNavigation,
  hideAuthor,
  hideWorkflow,
  deleteCallBack,
  isAuthorized,
  hideDelete,
}: {
  form: IForm;
  response: IResponse;
  hideBreadcrumbs: boolean;
  hideNavigation: boolean;
  hideAuthor: boolean;
  hideWorkflow: boolean;
  deleteCallBack: () => void;
  isAuthorized: boolean;
  hideDelete: boolean;
}) => {
  return (
    <DisplayResponse
      form={form}
      response={response}
      hideBreadcrumbs={hideBreadcrumbs}
      hideNavigation={hideNavigation}
      hideAuthor={hideAuthor}
      hideWorkflow={hideWorkflow}
      deleteCallBack={deleteCallBack}
      isAuthorized={isAuthorized}
      hideDelete={hideDelete}
    />
  );
};

describe('checks working of DisplayResponse', () => {
  it('checks rendering of breadcrumbs', () => {
    const props = getInitialProps();
    props.hideBreadcrumbs = false;

    render(<DisplyResponseTest {...props} />);
    const breadcrumb = screen.getByTestId('breadcrumb');
    expect(breadcrumb).toBeDefined();
  });
  it('checks rendering of navigation', () => {
    const props = getInitialProps();
    props.hideNavigation = false;
    render(<DisplyResponseTest {...props} />);
    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeDefined();
  });
  it('checks rendering of left navigation', () => {
    const props = getInitialProps();
    // const hideLeftNavigation = !(props.hideAuthor || props.hideNavigation || props.hideBreadcrumbs);
    // hideAuthor, hideNavigation and hideBreadcrumbs is false initially ,so it should render left navigation,
    render(<DisplyResponseTest {...props} />);
    const hideLeftNavigation = screen.getByTestId('hideLeftNavigation');
    expect(hideLeftNavigation).toBeDefined();
  });
  it('checks rendering of fields name', () => {
    const props = getInitialProps();
    render(<DisplyResponseTest {...props} />);
    const fieldName = screen.getByTestId('fieldName');
    expect(fieldName).toBeDefined();
    expect(fieldName.childNodes).toHaveLength(props.form.fields.length);
  });
  it('checks rendering of name field and created at field', () => {
    const props = getInitialProps();
    render(<DisplyResponseTest {...props} />);
    const userName = screen.getByTestId('userName');
    const createdAt = screen.getByTestId('createdAt');
    expect(createdAt).toBeDefined();
    expect(userName).toBeDefined();
    const userNameText = `by`; //to do
    expect(userName).toHaveTextContent(userNameText);
    const createAtText = `created at ${moment(props.response?.createdAt).format('l')} ${moment(
      props.response?.createdAt,
    ).format('LT')}`;
    expect(createdAt).toHaveTextContent(createAtText);
  });
  it('checks rendering of id', () => {
    const props = getInitialProps();
    render(<DisplyResponseTest {...props} />);
    const id = screen.getByTestId('ID');
    expect(id).toBeDefined();
    expect(id).toHaveTextContent(String(props.response?.count));
  });
  it('checks rendering of field (main response display)', () => {
    const props = getInitialProps();
    render(<DisplyResponseTest {...props} />);
    const label = screen.getByTestId('label');
    expect(label).toBeDefined();
    expect(label).toHaveTextContent(props.form?.fields[0]?.label);
    const fieldsDisplay = screen.getByTestId('fields-display');
    expect(fieldsDisplay).toBeDefined();
  });
  it("checks rendering of field's value", () => {
    const props = getInitialProps();
    render(<DisplyResponseTest {...props} />);
    const value = screen.getByTestId('value');
    expect(value).toBeDefined();
  });
});
