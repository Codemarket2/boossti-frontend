export const systemForms = {
  apps: {
    slug: 'apps',
    fields: { appDetails: 'app details', dashboardForms: 'dashboard forms' },
  },
  appDetails: {
    slug: 'app-details',
    fields: { appName: 'app name', subdomain: 'subdomain' },
  },
  appMenu: {
    slug: 'app-menu',
    fields: {
      menuLabel: 'menu label',
      form: 'form',
    },
  },
  appUsers: {
    slug: 'app-users',
    fields: {
      user: 'user',
      app: 'app',
      status: 'status',
    },
  },
  workflow: {
    slug: 'work-flow',
    fields: {
      workflowTitle: 'workflow title',
      step1: 'step 1',
      steps: 'steps',
    },
  },
  workflowSteps: {
    slug: 'workflow-steps',
    fields: {
      stepName: 'step name',
      stepForm: 'step form',
      condition: 'condition',
    },
  },
  rules: {
    slug: 'rules',
    fields: {
      name: 'name',
      field: 'field',
      ruleType: 'Rule Type',
      condition: 'Condition',
      props: 'Props',
      value: 'Value',
    },
  },
  feed: {
    slug: 'feed',
    fields: {
      message: 'message',
      link: 'link',
      status: 'status',
      receiver: 'receiver',
    },
  },
  activityLogCard: {
    formId: '63686d8320fac17631f16588',
    slug: 'activity-log-card',
    fields: {
      action: 'Action',
      model: 'Model',
      difference: 'Difference',
      message: 'Message',
      documentId: 'Document ID',
    },
  },
  model: {
    slug: 'model',
    fields: {
      name: 'name',
    },
  },
  userActionTypes: {
    slug: 'form-user-action-types',
    fields: {
      name: 'name',
    },
  },
};
