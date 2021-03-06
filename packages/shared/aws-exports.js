/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id: 'us-east-1:adf351b0-5244-41e5-ab45-5d6d479f26d7',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_uk8KNzt4X',
  aws_user_pools_web_client_id: '34pd0070kdsrgrtb4d92elmdur',
  oauth: {
    domain: 'boossti-dev.auth.us-east-1.amazoncognito.com',
    scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'https://www.boossti.com/,http://localhost:3000/',
    redirectSignOut: 'https://www.boossti.com/auth/,http://localhost:3000/auth/',
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: ['FACEBOOK', 'GOOGLE'],
  aws_cognito_signup_attributes: ['EMAIL', 'NAME'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: ['SMS'],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ['EMAIL'],
  aws_user_files_s3_bucket: 'boossti-bucket11510-dev',
  aws_user_files_s3_bucket_region: 'us-east-1',
};

export default awsmobile;
