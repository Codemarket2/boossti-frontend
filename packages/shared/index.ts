interface IProjectConfig {
  title: string;
  description: string;
  image: string;
  url: string;
  stripePublishableKey: string;
  defaultProfile: string;
  oneSignalAppId: string;
  appsyncGraphqlEndpoint: string;
  appsyncRegion: string;
  appsyncApiKey: string;
}

const projectConfig: IProjectConfig = {
  title: 'Vijaa',
  description: 'Learn, Share & Get Well Soon, Stories about prevention and survival.',
  image:
    'https://vijaa-content-bucket202938-dev.s3.amazonaws.com/public/media/default/vijaalogo.jpeg',
  url: 'https://vijaa.com',
  stripePublishableKey:
    'pk_test_517LnJnDPrb5EfwdRchW3z9AVO6xddwRZtSHqD311B4HW5j9Ouh9dmzU6UDiwH5Hwgh7jWSaqiQn7phQGitMPS0C500jhmK4yHw',
  defaultProfile:
    'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
  oneSignalAppId: '39d662b6-c57e-4b00-bab7-df62ceaee266',
  appsyncGraphqlEndpoint:
    'https://cow33tgsh5cntohwurp3aosbca.appsync-api.us-east-1.amazonaws.com/graphql',
  appsyncApiKey: 'da2-g22usoh4dza4zou6qxdyt2cg3q',
  appsyncRegion: 'us-east-1',
};

export default projectConfig;
