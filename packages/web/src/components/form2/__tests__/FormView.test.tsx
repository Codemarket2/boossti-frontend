import { FormView, FormViewProps } from '../FormView';
import { fireEvent, render, screen, act, waitFor, getByTestId } from '../../../../jest/test-utils';

const getInitialProps = () => {
  return {
    inlineEdit: false,
    fields: [
      {
        __typename: 'Field2',
        _id: '62f687f71a2c53f7da064729',
        label: 'name',
        fieldType: 'text',
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
          hidden: false,
          hiddenCondition: null,
        },
        template: null,
        form: null,
      },
      {
        __typename: 'Field2',
        _id: '62f68825313400a1609bc1db',
        label: 'Password',
        fieldType: 'password',
        options: {
          physicalQuantity: '',
          unit: '',
          default: false,
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
          hidden: false,
          hiddenCondition: null,
        },
        template: null,
        form: null,
      },
      {
        __typename: 'Field2',
        _id: '62f687f71a2c53f7da064729',
        label: 'name',
        fieldType: 'text',
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
          hidden: false,
          hiddenCondition: null,
        },
        template: null,
        form: null,
      },
      {
        __typename: 'Field2',
        _id: '62f68825313400a1609bc1db',
        label: 'Password',
        fieldType: 'password',
        options: {
          physicalQuantity: '',
          unit: '',
          default: false,
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
          hidden: false,
          hiddenCondition: null,
        },
        template: null,
        form: null,
      },
      {
        __typename: 'Field2',
        _id: '62f687f71a2c53f7da064729',
        label: 'name',
        fieldType: 'text',
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
          hidden: false,
          hiddenCondition: null,
        },
        template: null,
        form: null,
      },
      {
        __typename: 'Field2',
        _id: '62f68825313400a1609bc1db',
        label: 'Password',
        fieldType: 'password',
        options: {
          physicalQuantity: '',
          unit: '',
          default: false,
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
          hidden: false,
          hiddenCondition: null,
        },
        template: null,
        form: null,
      },
      {
        __typename: 'Field2',
        _id: '62f687f71a2c53f7da064729',
        label: 'name',
        fieldType: 'text',
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
          hidden: false,
          hiddenCondition: null,
        },
        template: null,
        form: null,
      },
      {
        __typename: 'Field2',
        _id: '62f68825313400a1609bc1db',
        label: 'Password',
        fieldType: 'password',
        options: {
          physicalQuantity: '',
          unit: '',
          default: false,
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
          hidden: false,
          hiddenCondition: null,
        },
        template: null,
        form: null,
      },
    ],
    handleSubmit: () => {
      return undefined;
    },
    loading: false,
    onCancel: () => {
      return true;
    },
    initialValues: [],
    // authRequired: false,
    // fieldWiseView: false,
    formId: '62f687f8af282a8147d7fd8c',
    edit: false,
    responseId: '',
    // form: '',
    responseCount: 0,
  };
};

const FormViewTest = ({
  inlineEdit,
  fields,
  handleSubmit,
  loading,
  onCancel,
  initialValues = [],
  //   authRequired = false,
  //   fieldWiseView = false,
  formId,
  edit,
  responseId,
  // form,
  responseCount,
}: FormViewProps) => {
  return (
    <FormView
      inlineEdit={inlineEdit}
      fields={fields}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      loading={loading}
      edit
      formId={formId}
      responseId={responseId}
      responseCount={responseCount}
      onCancel={onCancel}
    />
  );
};

describe('For FormView Component', () => {
  it('checks rendering of ID', () => {
    const props = getInitialProps();
    render(<FormViewTest {...props} />);
    expect(screen.getByTestId('ID')).toBeInTheDocument();
  });

  it('checks rendering of Field wise view', () => {
    const props = getInitialProps();
    render(<FormViewTest {...props} />);
    const fieldWiseView = screen.getByTestId('fieldWiseView');
    expect(fieldWiseView).toBeInTheDocument();
  });
  it('checks rendering of Text Danger', () => {
    const props = getInitialProps();

    render(<FormViewTest {...props} />);

    const textDanger = screen.getAllByTestId('text-danger');
    expect(textDanger.length).toBe(8);
  });

  it('checks rendering of field', () => {
    const props = getInitialProps();
    render(<FormViewTest {...props} />);
    const fields = screen.getAllByTestId('field');
    expect(fields.length).toBe(8);
  });
  it('checks rendering of multiple values ', () => {
    const props = getInitialProps();
    props.fields[0].options.multipleValues = true;
    render(<FormViewTest {...props} />);
    const multipleValues = screen.getByTestId('addOneMoreValue');
    expect(multipleValues).toBeInTheDocument();
  });
  // it(' checks rendering of next && back button', () => {
  //   const props = getInitialProps();

  //   render(<FormViewTest {...props} />);

  //   const nextButton = screen.getByTestId('nextButton');
  //   expect(nextButton).toBeInTheDocument();
  //   const backButton = screen.getByTestId('backButton');
  //   expect(backButton).toBeInTheDocument();
  // });
  it('checks rendering of Submit button && cancel button', () => {
    const props = getInitialProps();
    render(<FormViewTest {...props} />);
    const submitButton = screen.getByTestId('submitButton');
    expect(submitButton).toBeInTheDocument();
    const cancelButton = screen.getByTestId('cancelButton');
    expect(cancelButton).toBeInTheDocument();
  });
});
