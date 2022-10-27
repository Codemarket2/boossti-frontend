import { FunctionComponent } from 'react';

interface PanelSectionProps extends FunctionComponent {
  title: string;
  children?:
    | React.ReactNode
    | React.ReactNode[]
    | JSX.Element
    | JSX.Element[]
    | React.ReactElement
    | React.ReactElement[];
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
