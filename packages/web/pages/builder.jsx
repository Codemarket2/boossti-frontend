import dynamic from 'next/dynamic';
const BuilderScreen = dynamic(() => import('../src/components/contentbuilder/BuilderScreen'), {
  ssr: false,
});

export default function Builder() {
  return (
    <div>
      <BuilderScreen />
    </div>
  );
}
