import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import apiKeys from '@frontend/shared/config/apiKeys';
import throttle from 'lodash/throttle';
import { useEffect, useState } from 'react';
import Geocode from 'react-geocode';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
// const GOOGLE_MAPS_API_KEY = 'AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE';

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

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

interface IProps {
  _id: string;
  onChange: (arg: any) => void;
  values: any;
}

export default function AddressSearch({ _id, onChange, values }: IProps) {
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const [address, setAddress] = useState({ landmark: '', city: '', state: '', country: '' });
  const loaded = React.useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !loaded.current) {
      if (!document.querySelector('#google-maps')) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${apiKeys.GOOGLE}&libraries=places`,
          document.querySelector('head'),
          'google-maps',
        );
      }

      loaded.current = true;
    }
    Geocode.setApiKey(apiKeys.GOOGLE);
  }, []);

  const fetch = React.useMemo(
    () =>
      throttle((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  const fvalues = values.value?.split('+');

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

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

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

  const finalRes = `${value?.description}+${address.landmark}+${address.city}+${address.state}+${address.country}`;

  useEffect(() => {
    if (value?.description !== undefined) {
      onChange({
        field: _id,
        value: finalRes,
      });
    }
  }, [address, value]);

  useEffect(() => {
    if (options.length > 0) {
      Geocode.fromAddress(options[0]?.description).then(
        (res: any) => {
          const { lat, lng } = res.results[0].geometry.location;
          Geocode.fromLatLng(lat, lng).then(
            (response: any) => {
              let city: string;
              let state: string;
              let country: string;
              for (let i = 0; i < response.results[0].address_components.length; i += 1) {
                for (
                  let j = 0;
                  j < response.results[0].address_components[i].types.length;
                  j += 1
                ) {
                  switch (response.results[0].address_components[i].types[j]) {
                    case 'locality':
                      city = response.results[0].address_components[i].long_name;
                      break;
                    case 'administrative_area_level_1':
                      state = response.results[0].address_components[i].long_name;
                      break;
                    case 'country':
                      country = response.results[0].address_components[i].long_name;
                      break;
                    default:
                      break;
                  }
                }
              }
              setAddress((prevState) => ({
                ...prevState,
                city,
                state,
                country,
              }));
            },
            (error: any) => {
              alert(error);
            },
          );
        },
        (error: any) => {
          alert(error);
        },
      );
    }
  }, [value]);

  return (
    <Box
      sx={{
        margin: '10px 0px',
      }}
    >
      <Autocomplete
        id="google-map-demo"
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={fvalues[0]}
        onChange={(event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
        renderOption={(props, option) => {
          const matches = option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [match.offset, match.offset + match.length]),
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box component={LocationOnIcon} sx={{ color: 'text.secondary', mr: 2 }} />
                </Grid>
                <Grid item xs>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
      <TextField
        fullWidth
        sx={{ margin: '10px 0px' }}
        placeholder="Apt, suite, unit, building, floor, etc."
        variant="outlined"
        name="valueNumber"
        size="small"
        type="text"
        value={fvalues[1] === 'undefined' ? '' : fvalues[1]}
        onChange={({ target }) =>
          setAddress((prevState) => ({
            ...prevState,
            landmark: target.value,
          }))
        }
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <TextField
          fullWidth
          placeholder="City"
          variant="outlined"
          name="valueNumber"
          size="small"
          type="text"
          value={fvalues[2] === 'undefined' ? '' : fvalues[2]}
          onChange={({ target }) =>
            setAddress((prevState) => ({
              ...prevState,
              city: target.value,
            }))
          }
        />
        <TextField
          fullWidth
          sx={{ margin: '0px 10px' }}
          placeholder="State"
          variant="outlined"
          name="valueNumber"
          size="small"
          type="text"
          value={fvalues[3] === 'undefined' ? '' : fvalues[3]}
          onChange={({ target }) =>
            setAddress((prevState) => ({
              ...prevState,
              state: target.value,
            }))
          }
        />
        <TextField
          fullWidth
          placeholder="Country"
          variant="outlined"
          name="valueNumber"
          size="small"
          type="text"
          value={fvalues[4] === 'undefined' ? '' : fvalues[4]}
          onChange={({ target }) =>
            setAddress((prevState) => ({
              ...prevState,
              country: target.value,
            }))
          }
        />
      </Box>
    </Box>
  );
}
