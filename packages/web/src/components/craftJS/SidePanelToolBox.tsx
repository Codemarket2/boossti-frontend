// MUI
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MaterialButton from '@mui/material/Button';

// OTHERS
import { useEditor, useNode } from '@craftjs/core';

// CRAFTJS - WEB
import Button from './components/Button';
import Container from './components/Container';
import FormDisplay from './components/Form/FormDisplay';
import useGetFormList, { TFormListData } from './libs/hooks/useGetFormList';
import ComponentPropEditor from './ComponentPropEditor';
import PanelSection from './PanelSection';

interface TBOptionProps {
  text: string;
  component: React.ReactElement;
}

const TBOption = ({ text, component }: TBOptionProps) => {
  const { connectors } = useEditor();
  return (
    <MaterialButton ref={(ref) => connectors.create(ref, component)} variant="contained">
      {text}
    </MaterialButton>
  );
};

const FormSearch = () => {
  const [data, error, loading] = useGetFormList();

  if (loading) return <div>Loading Forms...</div>;

  if (error) return <div>Error while loading the forms...</div>;

  return (
    <Stack spacing={1}>
      {(data as TFormListData).getForms.data.map((val, idx) => {
        return (
          <TBOption
            key={idx}
            text={`Form - ${val.name}`}
            component={
              <FormDisplay
                settings={{
                  widgetType: 'form',
                }}
                formId={val._id}
              />
            }
          />
        );
      })}
    </Stack>
  );
};

const FormSection = () => {
  return (
    <PanelSection title="Form">
      <FormSearch />
    </PanelSection>
  );
};

const ComponentsSection = () => {
  return (
    <PanelSection title="Components">
      <Stack spacing={1}>
        <TBOption text="Button - Hi!!!" component={<Button text="Hi!!!!" />} />
        <TBOption text="Button - Bye!!!" component={<Button text="Bye!!!!" />} />
        <TBOption text="Container" component={<Container />} />
      </Stack>
    </PanelSection>
  );
};

const EditCompPropSection = () => {
  const { isCompSelected } = useEditor((state) => {
    return {
      isCompSelected: Boolean(state.events.selected.size),
    };
  });

  if (!isCompSelected) return null;

  return (
    <PanelSection title="Edit Component Prop">
      <ComponentPropEditor />
    </PanelSection>
  );
};

const ToolBox = () => {
  // useEffect(() => {
  //   console.log(data);
  //   // debugger;
  // }, [data]);

  return (
    <Paper sx={{ minWidth: '14rem' }}>
      <div>Toolbox!</div>

      <Stack spacing={1}>
        <ComponentsSection />
        <FormSection />
        <EditCompPropSection />
      </Stack>
    </Paper>
  );
};

export default ToolBox;
