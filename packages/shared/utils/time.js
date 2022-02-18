import moment from 'moment';

const oneMinute = 60000;
const oneHour = 3600000;
const oneDay = 86400000;

export const convertToUnit = (value, unit) => {
  let newValue = 0;
  if (value === 0) {
    newValue = 0;
    // newValue = '';
  } else if (unit === 'Minutes') {
    newValue = value / oneMinute;
  } else if (unit === 'Hours') {
    newValue = value / oneHour;
  } else if (unit === 'Days') {
    newValue = value / oneDay;
  }
  return newValue;
};

export const convertToMilliseconds = (value, unit) => {
  let newValue = 0;
  if (value === '' || value === 0) {
    newValue = 0;
  } else if (unit === 'Minutes') {
    newValue = value * oneMinute;
  } else if (unit === 'Hours') {
    newValue = value * oneHour;
  } else if (unit === 'Days') {
    newValue = value * oneDay;
  }
  return parseInt(newValue);
};

export const timeTo12HrFormat = (hour, minute) => {
  let tempHour = hour;
  let meridiem = 'AM';
  if (hour >= 12) {
    meridiem = 'PM';
    if (hour > 12) {
      tempHour -= 12;
    }
  }
  return `${tempHour === '00' ? '12' : tempHour}:${minute === 0 ? '00' : minute} ${meridiem}`;
};

export const getDateRange = (startDate, endDate) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let sDate = new Date(startDate);
  let eDate = new Date(endDate);
  if (startDate !== '' && endDate !== '') {
    if (sDate.getMonth() === eDate.getMonth()) {
      return `${sDate.getDate()} - ${eDate.getDate()} ${monthNames[eDate.getMonth()]}`;
    } else {
      return `${sDate.getDate()} ${monthNames[sDate.getMonth()]} - ${eDate.getDate()} ${
        monthNames[eDate.getMonth()]
      }`;
    }
  } else {
    return `${new Date(startDate).getDate()} ${monthNames[new Date(startDate).getMonth()]}`;
  }
};

export function getRangeOfDates(startDate, stopDate) {
  var dates = [],
    currentDate = new Date(startDate),
    addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  while (
    currentDate <= new Date(stopDate) ||
    moment(currentDate).format('YYYY-MM-DD') === moment(stopDate).format('YYYY-MM-DD')
  ) {
    dates.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}

export const saveDateAndTime = (startDate, endDate, startTime, endTime) => {
  const st = new Date(startDate);
  const et = new Date(endDate);
  st.setHours(startTime.getHours());
  st.setMinutes(startTime.getMinutes());
  et.setHours(endTime.getHours());
  et.setMinutes(endTime.getMinutes());
  if (st.getTime() < et.getTime() && st.getHours() + 2 <= et.getHours()) {
    return {
      startTime: new Date(st),
      endTime: new Date(et),
    };
  } else {
    if (st.getDate() === et.getDate() && st.getHours() + 2 <= 22) {
      et.setHours(st.getHours() + 2);
      return {
        startTime: st.toString(),
        endTime: et.toString(),
      };
    } else {
      et.setDate(st.getDate() + 1);
      return {
        startTime: st.toString(),
        endTime: et.toString(),
      };
    }
  }
};

export const saveDateWithTime = (startDate, endDate, startTime, endTime) => {
  const st = new Date(startDate);
  const et = new Date(endDate);
  st.setHours(startTime.getHours());
  st.setMinutes(startTime.getMinutes());
  et.setHours(endTime.getHours());
  et.setMinutes(endTime.getMinutes());
  return {
    startTime: new Date(st),
    endTime: new Date(et),
  };
};

export const changeToRoundOfDate = (newdate, hr = 0) => {
  const roundate = new Date(newdate);
  roundate.setHours(hr);
  roundate.setMinutes(0);
  return new Date(roundate);
};

export const changeToNewRoundOfDateTime = (newdate) => {
  const roundate = new Date(newdate);
  if (roundate.getMinutes() <= 15) {
    roundate.setMinutes(15);
  } else if (roundate.getMinutes() > 15 && roundate.getMinutes() <= 30) {
    roundate.setMinutes(30);
  } else if (roundate.getMinutes() > 30 && roundate.getMinutes() <= 45) {
    roundate.setMinutes(45);
  } else {
    if (roundate.getHours() <= 23) {
      roundate.setHours(roundate.getHours() + 1);
      roundate.setMinutes(0);
    } else {
      roundate.setDate(roundate.getDate() + 1);
      roundate.setHours(0);
      roundate.setMinutes(0);
    }
  }
  return new Date(roundate);
};

export const dateFormatInString = (newdate, format) => {
  const current = moment(newdate).format(format);
  return `${current}`;
};

export const convertStringToDate = (dateString) => {
  let utcTime = new Date(dateString).toUTCString();
  let currentSelectedDay = moment(utcTime).utc().format('ll');
  return currentSelectedDay;
};

export const roundTime = (time, minutesToRound) => {
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours);
  minutes = parseInt(minutes);

  // Convert hours and minutes to time in minutes
  time = hours * 60 + minutes;

  let rounded = Math.ceil(time / minutesToRound) * minutesToRound;
  let rHr = '' + Math.floor(rounded / 60);
  let rMin = '' + (rounded % 60);

  return rHr.padStart(2, '0') + ':' + rMin.padStart(2, '0');
};
