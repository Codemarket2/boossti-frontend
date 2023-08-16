import React from 'react';
import { Typography, AccordionSummary, Accordion } from '@mui/material';
import PaletteSubType from './PaletteSubType';

const paletteColorTypes = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

export default function PaletteTools() {
  return (
    <>
      <PaletteSubType
        title="Background"
        path="palette.background"
        paletteValues={[
          ['Default', 'default'],
          ['Paper', 'paper'],
        ]}
      />
      <PaletteSubType
        title="Text"
        path="palette.text"
        paletteValues={[
          ['Primary', 'primary'],
          ['Secondary', 'secondary'],
          ['Disabled', 'disabled'],
          ['Hint', 'hint'],
        ]}
      />
      {paletteColorTypes.map((colorType) => (
        <PaletteSubType
          key={colorType}
          title={colorType}
          path={`palette.${colorType}`}
          paletteValues={[
            ['Main', `main`],
            ['Light', `light`],
            ['Dark', `dark`],
            ['Contrast Text', `contrastText`],
          ]}
        />
      ))}
      <PaletteSubType title="Divider" path="palette" paletteValues={[['Divider', 'divider']]} />
    </>
  );
}
