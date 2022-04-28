import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { TextField } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import DisplayRichText from '../../components/common/DisplayRichText';
import RichTextarea from '../../components/common/RichTextarea2';

const Field = ({ fieldType }) => {
  const [value, setValue] = useState({
    date: moment(),
    dateTime: moment(),
  });
  switch (fieldType) {
    case 'label': {
      return <DisplayRichText value={'This is Label'} />;
    }
    case 'richTextarea': {
      return (
        <>
          <RichTextarea value={'This is rich Text area'} onChange={() => null} />
        </>
      );
    }
    case 'date': {
      return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            inputFormat="MM/DD/YYYY"
            renderInput={(props) => (
              <TextField
                {...props}
                fullWidth
                size="small"
                variant="outlined"
                placeholder={moment().format('L')}
              />
            )}
            onChange={(newValue) => setValue({ ...value, date: moment(newValue) })}
            value={value?.date ? moment(value.date) : null}
          />
        </LocalizationProvider>
      );
    }
    case 'dateTime': {
      return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            inputFormat="lll"
            value={value.dateTime ? moment(value.dateTime) : null}
            onChange={(newValue) => setValue({ ...value, dateTime: moment(newValue) })}
            // animateYearScrolling
            renderInput={(props) => (
              <TextField
                {...props}
                fullWidth
                size="small"
                variant="outlined"
                placeholder={moment().format('L')}
              />
            )}
          />
        </LocalizationProvider>
      );
    }
  }
};

export default Field;
