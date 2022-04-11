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
  title: 'Boossti',
  description: 'Dedicated web development team for local businesses.',
  image:
    'https://vijaa-content-bucket202938-dev.s3.us-east-1.amazonaws.com/public/media/testing/a7eceae1-6e31-4469-957c-8c020d8292361635602961218.jpeg',
  url: 'https://www.boossti.com',
  stripePublishableKey:
    'pk_test_517LnJnDPrb5EfwdRchW3z9AVO6xddwRZtSHqD311B4HW5j9Ouh9dmzU6UDiwH5Hwgh7jWSaqiQn7phQGitMPS0C500jhmK4yHw',
  defaultProfile:
    'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
  oneSignalAppId: '39d662b6-c57e-4b00-bab7-df62ceaee266',
  appsyncGraphqlEndpoint:
    'https://jftbz3dbbjhkvevg3vigpopfgi.appsync-api.us-east-1.amazonaws.com/graphql',
  appsyncApiKey: 'da2-4sfzo7hbjjhmvpsatrkpqjmwpy',
  appsyncRegion: 'us-east-1',
};

export default projectConfig;
