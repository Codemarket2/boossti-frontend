export enum FormActionTriggerTypeEnum {
  OnCreate = 'onCreate',
  OnUpdate = 'onUpdate',
  OnDelete = 'onDelete',
  OnView = 'onView',
  AddElementOnResponse = 'addElementOnResponse',
}

export enum FormActionElementTypeEnum {
  Button = 'button',
  // Text = 'text',
}

export enum ActionTypeEnum {
  ShowMessage = 'showMessage',
  SendEmail = 'sendEmail',
  SendSms = 'sendSms',
  GenerateNewUser = 'generateNewUser',
  UpdateFieldValue = 'updateFieldValue',
  SendInAppNotification = 'sendInAppNotification',
  SendPushNotification = 'sendPushNotification',
  OnPaletteChange = 'onPaletteChange',
  CreateCognitoGroup = 'createCognitoGroup',
  UpdateCognitoGroup = 'updateCognitoGroup',
  DeleteCognitoGroup = 'deleteCognitoGroup',
  CreateCognitoUser = 'createCognitoUser',
  UpdateCognitoUser = 'updateCognitoUser',
  DeleteCognitoUser = 'deleteCognitoUser',
  LinkedinInviteAutomation = 'linkedinInviteAutomation',
  CreateWhatsappGroup = 'createWhatsappGroup',
  EmailScrappingFromGoogleSeachAPI = 'emailScrappingFromGoogleSeachAPI',
  CreateSeoReport = 'createSeoReport',
  CreateSubDomainRoute53 = 'createSubDomainRoute53',
  UpdateSubDomainRoute53 = 'updateSubDomainRoute53',
  DeleteSubDomainRoute53 = 'deleteSubDomainRoute53',
  SaveDataToFormResponse = 'saveDataToFormResponse',
  None = '',
}
