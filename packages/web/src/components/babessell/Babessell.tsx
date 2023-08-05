import * as React from 'react';
import Hero from './components/Hero';
import TwoPartition from './components/twopartition/twopartition';
import ThreePartition from './components/threePartition';
import TwoPartition2 from './components/twopartion2/twoPartition2';
import FourPartition from './components/fourPartition/fourPartition';

export default function Babessell(props) {
  const threePartitionOptions = {
    imageUrl:
      'https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/59e23486290a4bf0b554dfaed3929aeb.png',
    title: 'Introducing the new Bing. Your  AI-powered copilot for the web.',
    desc:
      ' With the new Bing, answers are just the beginning. Ask real questions. Make refinements in chat. Get comprehensive answers. Turn ideas into drafts. Find it buil into Microsoft Edge, the best browser for the new Bing.',
    buttonLabel: 'Learn more',
    buttonLink: 'https://www.bing.com',
    backgroundColor: '#F1F8FE',
    color: 'black',
    minHeight: '60vh',
  };
  return (
    <>
      <Hero />
      <TwoPartition
        imageUrl="https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/5ce78cc0a9a54d58ad65afcc2c4c76c7.png"
        title="Enhance your browsing capabilities with AI"
        desc="  Get quick access to AI-powered tools, apps, and more right within Microsoft Edge’s sidebar. This includes Bing Chat where you can ask questions, get answers, refinesearch, summarize, and create content–all without switching tabs or breaking your flow."
        buttonLabel="Learn more"
        buttonLink={threePartitionOptions.buttonLink}
        backgroundColor="#F1F8FE"
        color="black"
        minHeight="80vh"
      />
      <ThreePartition
        imageUrl="https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/29bfeef37eef4ca3bcf962274c1c7766.png"
        title="What's new in Microsoft Edge"
        desc="Microsoft Edge introduces exciting new features every month. Check out the latest features here."
        buttonLabel="See what's new"
        buttonLink={threePartitionOptions.buttonLink}
        backgroundColor="#173B61"
        color="white"
        minHeight="10vh"
      />
      <TwoPartition2 />
      <ThreePartition
        imageUrl={threePartitionOptions.imageUrl}
        title={threePartitionOptions.title}
        desc={threePartitionOptions.desc}
        buttonLabel={threePartitionOptions.buttonLabel}
        buttonLink={threePartitionOptions.buttonLink}
        backgroundColor={threePartitionOptions.backgroundColor}
        color={threePartitionOptions.color}
        minHeight={threePartitionOptions.minHeight}
      />
      <TwoPartition
        imageUrl="https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/b6fbc8e12db14dbc880f41b4f36f1fe0.png"
        title="Browse with Edge across all your devices"
        desc="Easily sync your passwords, favorites, and settings across all your devices—Windows, macOS, iOS, or Android."
        buttonLabel="Download now"
        buttonLink={threePartitionOptions.buttonLink}
        backgroundColor="white"
        color="black"
        minHeight="20vh"
      />
      <ThreePartition
        imageUrl="https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/bf56067df7634abdb4eb81b2b62513ea.png"
        title="Stay safer online"
        desc="Microsoft Edge security and privacy features such as Microsoft Defender SmartScreen, Password Monitor, InPrivate search, and Kids Mode help keep you and your loved ones protected and secure online."
        buttonLabel="Try Now  "
        buttonLink={threePartitionOptions.buttonLink}
        backgroundColor="#F2F3F3"
        color={threePartitionOptions.color}
        minHeight={threePartitionOptions.minHeight}
      />
      <TwoPartition
        imageUrl="https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/f7bc9c80a77b45ae9c98c1274d5e8e93.jpg"
        title="Achieve more performance"
        desc="Built on the same technology as Chrome, Microsoft Edge has additional built-in features like Startup boost and Sleeping tabs, which boost your browsing experience with world class performance and speed that are optimized to work best with Windows."
        buttonLabel="Learn More"
        buttonLink={threePartitionOptions.buttonLink}
        backgroundColor="white"
        color="black"
        minHeight="30vh"
        thirdBox
        thirdBoxTitle="Get an average of 25 more minutes of battery life with efficiency mode. Only on Microsoft Edge."
      />
    </>
  );
}
