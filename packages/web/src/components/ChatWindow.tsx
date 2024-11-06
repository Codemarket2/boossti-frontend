import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatMessage from './ChatMessage';
import ChatSelect from './ChatSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    maxWidth: 'md',
    margin: '0 auto 2rem auto',
    border: '1px solid #ddd',
    borderRadius: '1rem',
    boxShadow: theme.shadows[2],
  },
}));

const ChatWindow = () => {
  const classes = useStyles();

  const [botMessage1, setBotMessage1] = useState('');
  const [personStartsTyping1, setPersonStartsTyping1] = useState(false);
  const [personMessage1, setPersonMessage1] = useState('');

  const [botStartsTyping2, setBotStartsTyping2] = useState(false);
  const [botMessage2, setBotMessage2] = useState('');
  const [showCitySelection, setShowCitySelection] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [personMessage2, setPersonMessage2] = useState('');

  const [botStartsTyping3, setBotStartsTyping3] = useState(false);
  const [botMessage3, setBotMessage3] = useState('');
  const [showBusinessSelection, setShowBusinessSelection] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [personMessage3, setPersonMessage3] = useState('');

  const botFullMessage1 = 'Do you want to grow your business?';
  const personFullMessage1 = 'Yes.';
  const botFullMessage2 = 'Which city are you in?';
  const botFullMessage3 = 'What type of business is your business?';

  const handleSelection = (e: React.ChangeEvent<{ name?: string; value: string }>) => {
    if (e.target.name === 'city') {
      setSelectedCity(e.target.value);
    } else if (e.target.name === 'business') {
      setSelectedBusiness(e.target.value);
    }
  };

  useEffect(() => {
    if (botMessage1.length < botFullMessage1.length) {
      const timeout = setTimeout(() => {
        setBotMessage1(botFullMessage1.slice(0, botMessage1.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
    setPersonStartsTyping1(true);
  }, [botMessage1]);

  useEffect(() => {
    if (personStartsTyping1 && personMessage1.length < personFullMessage1.length) {
      const timeout = setTimeout(() => {
        setPersonMessage1(personFullMessage1.slice(0, personMessage1.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
    if (personMessage1.length === personFullMessage1.length) {
      setBotStartsTyping2(true);
    }
  }, [personStartsTyping1, personMessage1]);

  useEffect(() => {
    if (botStartsTyping2 && botMessage2.length < botFullMessage2.length) {
      const timeout = setTimeout(() => {
        setBotMessage2(botFullMessage2.slice(0, botMessage2.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
    if (botMessage2.length === botFullMessage2.length) {
      setShowCitySelection(true);
    }
  }, [botStartsTyping2, botMessage2]);

  useEffect(() => {
    if (selectedCity) {
      setBotStartsTyping3(true);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (botStartsTyping3 && botMessage3.length < botFullMessage3.length) {
      const timeout = setTimeout(() => {
        setBotMessage3(botFullMessage3.slice(0, botMessage3.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
    if (botMessage3.length === botFullMessage3.length) {
      setShowBusinessSelection(true);
    }
  }, [botStartsTyping3, botMessage3]);

  return (
    <div className={classes.root}>
      <ChatMessage type="bot" message={botMessage1} />
      {personStartsTyping1 && <ChatMessage type="person" message={personMessage1} />}
      {botStartsTyping2 && botMessage2 && <ChatMessage type="bot" message={botMessage2} />}

      {showCitySelection && (
        <ChatSelect
          value={selectedCity}
          name="city"
          onChange={handleSelection}
          options={[
            'Beverly Hills',
            'Santa Monica',
            'Culver City',
            'Torrance',
            'Glendale',
            'West Hollywood',
            'West Los Angeles',
            'Pacific Design center',
          ]}
        />
      )}

      {botStartsTyping3 && <ChatMessage type="bot" message={botMessage3} />}

      {showBusinessSelection && (
        <ChatSelect
          value={selectedBusiness}
          name="business"
          onChange={handleSelection}
          options={[
            'Restaurant',
            'Hotel',
            'Medical Facility',
            'Wellness Spa',
            'Salon',
            'Law Office',
            'Realtor',
          ]}
        />
      )}
    </div>
  );
};

export default ChatWindow;
