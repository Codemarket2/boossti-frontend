/* eslint-disable no-unneeded-ternary */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

export interface ICard {
  cvc: string | number;
  expiry: string | number;
  name: string;
  number: string | number;
}

// const demoCardState = {
//   cvc: '501',
//   expiry: '05/27',
//   focused: undefined,
//   name: 'John Doe',
//   number: '4532523851543181',
// };

interface IError {
  isError: boolean;
  message: string;
}
interface ICardError {
  cvc: IError;
  expiry: IError;
  name: IError;
  number: IError;
}

interface ICardState {
  cvc: string | number;
  expiry: string | number;
  focused?: Focused | undefined;
  name: string;
  number: string | number;
}

export default function Card({ value, onChange }: IProps) {
  const getInitialError: () => IError = () => {
    return { isError: false, message: '' };
  };

  const [submitState, setSubmitState] = useState<'primary' | 'success' | 'error'>('primary');

  const [cardState, setCardState] = useState<ICardState>({
    cvc: '',
    expiry: '',
    focused: undefined,
    name: '',
    number: '',
  });
  const [cardError, setCardError] = useState<ICardError>({
    cvc: getInitialError(),
    expiry: getInitialError(),
    name: getInitialError(),
    number: getInitialError(),
  });

  const handleInputFocus = (e: any) =>
    setCardState((prev) => {
      return { ...prev, focused: e.target.name };
    });
  const handleInputChange = (e: any) => {
    const { name, value: val } = e.target;
    // setCardState((prev) => {
    //     return { ...prev, [name]: value };
    // });
    const numberRegExp = /^[0-9]{16}$/i;
    const cvcRegExp = /^[0-9]{3}$/i;
    const expiryRegExp = /^0[1-9]|1[0-2]\/[0-9][0-9]$/i;

    switch (name) {
      case 'number':
        setCardState((prev) => {
          return { ...prev, number: parseInt(val, 10) };
        });
        if (!numberRegExp.test(val?.toString())) {
          setCardError((prev) => {
            return { ...prev, number: { isError: true, message: 'Number length == 16' } };
          });
        } else {
          setCardError((prev) => {
            return { ...prev, number: { isError: false, message: '' } };
          });
        }
        break;
      case 'cvc':
        setCardState((prev) => {
          return { ...prev, cvc: parseInt(val, 10) };
        });
        if (!cvcRegExp.test(val?.toString())) {
          setCardError((prev) => {
            return { ...prev, cvc: { isError: true, message: 'CVV length should be == 3' } };
          });
        } else {
          setCardError((prev) => {
            return { ...prev, cvc: { isError: false, message: '' } };
          });
        }
        break;
      case 'expiry':
        setCardState((prev) => {
          return { ...prev, expiry: val };
        });

        if (!expiryRegExp.test(val)) {
          setCardError((prev) => {
            return { ...prev, expiry: { isError: true, message: 'Expiry should be in MM/YY' } };
          });
        } else {
          setCardError((prev) => {
            return { ...prev, expiry: { isError: false, message: '' } };
          });
        }
        break;
      case 'name':
        setCardState((prev) => {
          return { ...prev, name: val };
        });
        break;
      default:
        break;
    }
  };

  const handleCardSubmit = (e: any) => {
    e.preventDefault();
    try {
      if (
        !cardError.cvc.isError ||
        !cardError.number.isError ||
        !cardError.expiry.isError ||
        !cardError.name.isError
      ) {
        setSubmitState('success');
        onChange(
          JSON.stringify({
            cvc: cardState.cvc,
            expiry: cardState.expiry,
            name: cardState.name,
            number: cardState.number,
          }),
        );
      }
    } catch (err) {
      setSubmitState('error');
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
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

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              width: '100%',
              mt: '4px',
              mb: '4px',
            },
            maxWidth: '20rem',
            mt: '4px',
            p: '5px',
            pl: '1rem',
            pr: '1rem',
          }}
          onSubmit={handleCardSubmit}
          noValidate
          className=""
          autoComplete="off"
        >
          <div>
            <TextField
              required
              name="number"
              type="number"
              id="outlined-required"
              label="Card Number"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              error={cardError.number.isError}
              helperText={cardError.number.isError ? cardError.number.message : null}
              onFocus={handleInputFocus}
              value={cardState.number}
              onChange={handleInputChange}
            />
            <TextField
              required
              name="name"
              type="text"
              id="outlined-required"
              label="Name"
              error={cardError.name.isError}
              onFocus={handleInputFocus}
              value={cardState.name}
              onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex' }} className="inputWrapper">
              <TextField
                required
                sx={{ marginRight: '8px' }}
                name="expiry"
                type="text"
                id="outlined-required"
                label="Expiry"
                placeholder="MM/YY"
                helperText={cardError.expiry.isError ? cardError.expiry.message : null}
                error={cardError.expiry.isError}
                onFocus={handleInputFocus}
                value={cardState.expiry}
                onChange={handleInputChange}
              />
              <TextField
                required
                name="cvc"
                type="number"
                id="outlined-required"
                label="CVV"
                helperText={cardError.cvc.isError ? cardError.cvc.message : null}
                error={cardError.cvc.isError}
                onFocus={handleInputFocus}
                value={cardState.cvc}
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                disabled={
                  cardError.cvc.isError ||
                  cardError.number.isError ||
                  cardError.expiry.isError ||
                  cardError.name.isError
                    ? true
                    : false
                }
                type="submit"
                color={submitState}
                sx={{ mt: '0.25rem', width: '8rem' }}
                variant="outlined"
              >
                Submit
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    </>
  );
}
