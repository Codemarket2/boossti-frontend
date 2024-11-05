import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Message from './Message';
import Select from './Select';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    maxWidth: 'md',
    margin: 'auto',
  },
}));

const HeroTypingAnimation = () => {
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
    if (selectedCity && personMessage2.length < selectedCity.length) {
      const timeout = setTimeout(() => {
        setPersonMessage2(selectedCity.slice(0, personMessage2.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
    if (selectedCity && personMessage2.length === selectedCity.length) {
      setBotStartsTyping3(true);
    }
  }, [selectedCity, personMessage2]);

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

  useEffect(() => {
    if (selectedBusiness && personMessage3.length < selectedBusiness.length) {
      const timeout = setTimeout(() => {
        setPersonMessage3(selectedBusiness.slice(0, personMessage3.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [selectedBusiness, personMessage3]);

  return (
    <div className={classes.root}>
      <Message type="bot" message={botMessage1} />
      {personStartsTyping1 && <Message type="person" message={personMessage1} />}
      {botStartsTyping2 && botMessage2 && <Message type="bot" message={botMessage2} />}
      {showCitySelection && !selectedCity && (
        <Select
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
      {selectedCity && <Message type="person" message={personMessage2} />}
      {botStartsTyping3 && <Message type="bot" message={botMessage3} />}
      {showBusinessSelection && !selectedBusiness && (
        <Select
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
      {selectedBusiness && <Message type="person" message={personMessage3} />}
    </div>
  );
};

export default HeroTypingAnimation;
