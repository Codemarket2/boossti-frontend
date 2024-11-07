import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  innerSec: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'end',
  },
  dropdown: {
    padding: theme.spacing(1),
    fontSize: '1rem',
    border: 'none',
    borderRadius: `20px 20px 0 20px`,
    marginTop: theme.spacing(1),
    backgroundColor: '#f7f7f7',
  },
  imgDiv: {
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: '50%',
    backgroundColor: '#f7f7f7',
  },
}));

type ChatSelectProps = {
  value: string;
  name: string;
  onChange: (e: any) => void;
  options: string[];
};

const ChatSelect = ({ value, name, onChange, options }: ChatSelectProps) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.innerSec}>
        <select className={classes.dropdown} value={value} name={name} onChange={onChange}>
          <option value="">Select a {name}</option>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
        <div className={`${classes.imgDiv}`}>
          <Image src="/person.png" alt="Person" width={32} height={32} />
        </div>
      </div>
    </>
  );
};

export default ChatSelect;
