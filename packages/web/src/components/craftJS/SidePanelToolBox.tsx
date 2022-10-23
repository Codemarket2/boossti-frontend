// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MaterialButton from '@mui/material/Button';

// OTHERS
import { useEditor } from '@craftjs/core';

// WEB
import Btn from './components/Button';
import Container from './components/Container';

interface TBOptionProps {
  text: string;
  component: JSX.Element;
}

const TBOption = ({ text, component }: TBOptionProps) => {
  const { connectors } = useEditor();
  return (
    <MaterialButton ref={(ref) => connectors.create(ref, component)} variant="contained">
      {text}
    </MaterialButton>
  );
};

const ToolBox = () => {
  return (
    <Paper sx={{ minWidth: '14rem' }}>
      <div>Toolbox!</div>

      <Stack spacing={1}>
        <TBOption text="Button - Hi!!!" component={<Btn text="Hi!!!!" />} />
        <TBOption text="Button - Bye!!!" component={<Btn text="Bye!!!!" />} />
        <TBOption text="Container" component={<Container />} />
      </Stack>
    </Paper>
  );
};

export default ToolBox;
