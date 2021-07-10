interface IProjectConfig {
  title: string;
  stripePublishableKey: string;
  defaultProfile: string;
  oneSignalAppId: string;
  appsyncGraphqlEndpoint: string;
  appsyncRegion: string;
  appsyncApiKey: string;
}

const projectConfig: IProjectConfig = {
  title: 'Vijaa',
  stripePublishableKey:
    'pk_test_517LnJnDPrb5EfwdRchW3z9AVO6xddwRZtSHqD311B4HW5j9Ouh9dmzU6UDiwH5Hwgh7jWSaqiQn7phQGitMPS0C500jhmK4yHw',
  defaultProfile:
    'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
  oneSignalAppId: '39d662b6-c57e-4b00-bab7-df62ceaee266',
  appsyncGraphqlEndpoint:
    'https://h3d776ytrjd7pfarmb234bxx7m.appsync-api.us-east-1.amazonaws.com/graphql',
  appsyncRegion: 'us-east-1',
  appsyncApiKey: 'da2-lonec36nazamdope24mq6dl7xu',
};

export default projectConfig;
