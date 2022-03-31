/* eslint-disable camelcase */
import { useEffect, useState, useMemo, useRef } from 'react';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import apiKeys from '@frontend/shared/config/apiKeys';
// eslint-disable-next-line import/no-extraneous-dependencies
import throttle from 'lodash/throttle';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

const filter = createFilterOptions();

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const StyledLocationOnIcon = styled(LocationOnIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(2),
}));

interface PlaceType {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      },
    ];
  };
}

interface IProps {
  value: string;
  onChange: (arg: string) => void;
  label?: string;
}

export default function GoogleMaps({ value, label, onChange }: IProps) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !loaded.current) {
      if (!document.querySelector('#google-maps')) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${apiKeys.GOGGLE}&libraries=places`,
          document.querySelector('head'),
          'google-maps',
        );
      }

      loaded.current = true;
    }
  }, []);

  const fetch = useMemo(
    () =>
      throttle((request: { input: string }, callback: (results?: PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions = [] as any;

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            structured_formatting: { main_text: `Add "${params.inputValue}"` },
            description: params.inputValue,
          });
        }

        return filtered;
      }}
      //   filterOptions={(x) => x}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        if (newValue && newValue.description) {
          onChange(newValue.description);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label || 'Address'} variant="outlined" fullWidth />
      )}
      renderOption={(option: any) => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <StyledLocationOnIcon />
            </Grid>
            <Grid item xs>
              <span className="font-weight-bold">{option.structured_formatting.main_text}</span>
              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text &&
                  option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
