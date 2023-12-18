/* eslint-disable no-unneeded-ternary */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

interface IProps {
  value?: string;
}

export interface ICard {
  cvc: string | number;
  expiry: string | number;
  name: string;
  number: string | number;
}

interface ICardState {
  cvc: string | number;
  expiry: string | number;
  focused?: Focused | undefined;
  name: string;
  number: string | number;
}

export default function DisplayCard({ value }: IProps) {
  const [cardState, setCardState] = useState<ICardState>({
    cvc: '',
    expiry: '',
    focused: undefined,
    name: '',
    number: '',
  });

  useEffect(() => {
    if (value) {
      const data = JSON.parse(value);
      setCardState((prev) => {
        return {
          ...prev,
          cvc: parseInt(data.cvc, 10),
          expiry: data.expiry,
          name: data.name,
          number: parseInt(data.number, 10),
        };
      });
    }
  }, []);

  const handleCVC = (isIn: boolean) => {
    if (isIn) {
      setCardState((prev) => {
        return {
          ...prev,
          focused: 'cvc',
        };
      });
    } else {
      setCardState((prev) => {
        return {
          ...prev,
          focused: undefined,
        };
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
        className="component-wrapper"
      >
        <Box sx={{ maxWidth: '20rem', pt: '1rem' }} className="cardWrapper">
          <Cards
            cvc={cardState.cvc}
            expiry={cardState.expiry}
            focused={cardState.focused}
            name={cardState.name}
            number={cardState.number}
          />
        </Box>
        <Button
          style={{ marginLeft: '12px', cursor: 'pointer' }}
          onMouseOut={() => handleCVC(false)}
          onMouseOver={() => handleCVC(true)}
          variant="outlined"
        >
          CVV
        </Button>
      </Box>
    </>
  );
}
