interface IProjectConfig {
  title: string;
  stripePublishableKey: string;
  defaultProfile: string;
}

const projectConfig: IProjectConfig = {
  title: 'Drreamz',
  stripePublishableKey:
    'pk_test_517LnJnDPrb5EfwdRchW3z9AVO6xddwRZtSHqD311B4HW5j9Ouh9dmzU6UDiwH5Hwgh7jWSaqiQn7phQGitMPS0C500jhmK4yHw',
  defaultProfile:
    'https://codemarket-common-bucket.s3.amazonaws.com/public/defaults/pictures/default.jpg',
};

export default projectConfig;
