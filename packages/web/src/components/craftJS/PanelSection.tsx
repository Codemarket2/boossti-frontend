import { FunctionComponent, ReactNode } from 'react';

interface PanelSectionProps {
  title: string;
  children?: JSX.Element;
}
const PanelSection = ({ title, children }: PanelSectionProps) => {
  return (
    <div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default PanelSection;
