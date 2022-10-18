import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { IHooksProps } from '../../types/common';
import { ConditionPart } from '../../types';

const validationSchema = yup.object({
  active: yup.boolean(),
  actionType: yup.string().label('Action type').required(),
  triggerType: yup.string().label('Trigger Type').required(),
  name: yup.string().label('Action name').required(),
  phoneFieldId: yup.string().when('actionType', {
    is: (value) => value === 'sendSms',
    then: yup.string().label('Phone Field').required(),
    otherwise: yup.string(),
  }),
  senderEmail: yup.string().when('actionType', {
    is: (value) => ['sendEmail', 'generateNewUser'].includes(value),
    // then: yup.string().label('Sender email').email().required(),
    then: yup.string().label('Sender email').required(),
    otherwise: yup.string(),
  }),
  receiverType: yup.string().label('Receiver').required(),
  emailFieldId: yup.object().when('receiverType', {
    is: (value) => value === 'emailField',
    then: yup.object().label('Email field').required(),
    otherwise: yup.object().nullable(),
  }),
  receiverEmails: yup.array().when('actionType', {
    is: (value) => value === 'sendEmail',
    then: yup.array().when('receiverType', {
      is: (value) => value === 'customEmail',
      then: yup
        .array()
        .label('Receiver emails')
        .of(yup.string().label(' ').email().required())
        .min(1),
      otherwise: yup.array(),
    }),
    otherwise: yup.array(),
  }),
  variables: yup.array(),
  subject: yup.string().when('actionType', {
    is: (value) => ['sendEmail', 'generateNewUser'].includes(value),
    then: yup.string().required('Email subject is required'),
    otherwise: yup.string(),
  }),
  body: yup.string().when('actionType', {
    is: (value) =>
      [
        'showMessage',
        'sendEmail',
        'sendSms',
        'generateNewUser',
        'sendInAppNotification',
        'sendPushNotification',
      ].includes(value),
    then: yup.string().required('This is a required field'),
    otherwise: yup.string(),
  }),

  signupEmailSubject: yup.string().when('actionType', {
    is: (actionType) => actionType === 'createCognitoUser',
    then: yup.string().required('Email Subject is required'),
    otherwise: yup.string(),
  }),
  signupEmailBody: yup.string().when('actionType', {
    is: (actionType) => actionType === 'createCognitoUser',
    then: yup.string().required('Email Body is required'),
    otherwise: yup.string(),
  }),
  userPoolId: yup.string().when('actionType', {
    is: (value) =>
      ['createCognitoGroup', 'updateCognitoGroup', 'deleteCognitoGroup'].includes(value),
    then: yup.string().required('Userpoll Id is required for this action'),
    otherwise: yup.string(),
  }),
  cognitoGroupName: yup.string().when('actionType', {
    is: (value) =>
      ['createCognitoGroup', 'updateCognitoGroup', 'deleteCognitoGroup'].includes(value),
    then: yup.string().required('Cognito Group Name is required for this action'),
    otherwise: yup.string(),
  }),
  cognitoGroupDesc: yup.string().when('actionType', {
    is: (value) =>
      ['createCognitoGroup', 'updateCognitoGroup', 'deleteCognitoGroup'].includes(value),
    then: yup.string().required('Cognito Group Description is required for this action'),
    otherwise: yup.string(),
  }),
  domain: yup.string().when('actionType', {
    is: (value) =>
      ['createSubDomainRoute53', 'updateSubDomainRoute53', 'deleteSubDomainRoute53'].includes(
        value,
      ),
    then: yup.string().required('Select Domain name field'),
    otherwise: yup.string(),
  }),
  distributionId: yup.string().when('actionType', {
    is: (value) =>
      ['createSubDomainRoute53', 'updateSubDomainRoute53', 'deleteSubDomainRoute53'].includes(
        value,
      ),
    then: yup.string().required('Select Cloudfront distributionId field'),
    otherwise: yup.string(),
  }),
});

type TVariables = {
  name: string;
  field: string;
  formId?: any;
};

type TActionType =
  | 'showMessage'
  | 'sendEmail'
  | 'sendSms'
  | 'generateNewUser'
  | 'updateFieldValue'
  | 'sendInAppNotification'
  | 'sendPushNotification'
  | 'onPaletteChange'
  | 'createCognitoGroup'
  | 'updateCognitoGroup'
  | 'deleteCognitoGroup'
  | 'createCognitoUser'
  | 'updateCognitoUser'
  | 'deleteCognitoUser'
  | 'createSeoReport'
  | 'createSubDomainRoute53'
  | 'updateSubDomainRoute53'
  | 'deleteSubDomainRoute53';

type TFormValues = {
  active: boolean;
  triggerType: string;
  actionType: TActionType;
  name: string;
  cognitoGroupName: string;
  cognitoGroupDesc: string;
  phoneFieldId: string;
  senderEmail: string;
  receiverType: string;
  emailFieldId: ConditionPart;
  nameFieldId: string;
  receiverEmails: string[];
  variables: TVariables[];
  colorValues: any[];
  fields: any;
  subject: string;
  body: string;
  templateSenderEmail: string;
  signupEmailSubject: string;
  signupEmailBody: string;
  userPoolId: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  websiteUrl: string;
  report: string;
  responseLink: string;
  reportScreenshoot: string;
  domain: string;
  distributionId: string;
  linkedinEmail: string;
  linkedinPassword: string;
  noOfInvites: number;
  keyword: string;
  tag: string;
  phoneNumber: string;
  productid: string;
  phoneID: number;
  apiToken: string;
  groupName: string;
  whatsappMessage: string;
};

const defaultFormValues: TFormValues = {
  active: true,
  triggerType: 'onCreate',
  actionType: 'sendEmail',
  name: '',
  cognitoGroupName: '',
  cognitoGroupDesc: '',
  phoneFieldId: '',
  senderEmail: '',
  receiverType: 'formOwner',
  emailFieldId: null,
  nameFieldId: '',
  receiverEmails: [],
  variables: [{ name: '', field: '', formId: null }],
  colorValues: [],
  fields: [{ field: '', formId: null, value: null }],
  subject: '',
  body: '',
  templateSenderEmail: '',
  signupEmailSubject: '',
  signupEmailBody: '',
  userPoolId: '',
  firstName: '',
  lastName: '',
  userEmail: '',
  websiteUrl: '',
  report: '',
  responseLink: '',
  reportScreenshoot: '',
  domain: '',
  distributionId: '',
  linkedinEmail: '',
  linkedinPassword: '',
  noOfInvites: 0,
  keyword: '',
  tag: '',
  phoneNumber: '',
  productid: '',
  phoneID: null,
  apiToken: '',
  groupName: '',
  whatsappMessage: ' ',
};

interface IProps extends IHooksProps {
  onSave: any;
}

export function useFormActions({ onAlert, onSave }: IProps) {
  const [edit, setEdit] = useState(false);

  const formik = useFormik<TFormValues>({
    initialValues: defaultFormValues,
    validationSchema,
    onSubmit: async (payload) => {
      try {
        if (edit) {
          onSave(payload, 'update');
        } else {
          onSave(payload, 'create');
        }
        formik.handleReset('');
      } catch (error) {
        onAlert('Error', error.message);
      }
    },
  });

  const setFormValues = (payload: TFormValues) => {
    setEdit(true);
    const newValues = { ...defaultFormValues };
    Object.keys(defaultFormValues).forEach((key) => {
      if (payload[key] !== undefined) {
        newValues[key] = payload[key];
      }
    });
    formik.setValues(newValues);
  };

  return { formik, setFormValues, edit } as const;
}
