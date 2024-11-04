import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    maxWidth: 'md',
    margin: 'auto',
  },
  innerSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  imgDiv: {
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: '50%',
  },
  botImageDiv: {
    backgroundColor: '#b3c3ff',
  },
  messageDiv: {
    color: '#333',
    marginBottom: 0,
  },
  personImgDiv: {
    backgroundColor: '#f7f7f7',
  },
  botMessageContainer: {
    backgroundColor: '#b3c3ff',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `20px 20px 20px 0`,
  },
  userMessageContainer: {
    backgroundColor: '#f7f7f7',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `20px 20px 0 20px`,
    marginLeft: 'auto',
  },
}));

const HeroTypingAnimation = () => {
  const classes = useStyles();

  // First message state
  const [botMessage, setBotMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [showUserTyping, setShowUserTyping] = useState(false);

  // Second message state
  const [botMessage2, setBotMessage2] = useState('');
  const [userMessage2, setUserMessage2] = useState('');
  const [showUserTyping2, setShowUserTyping2] = useState(false);

  // Third message state
  const [botMessage3, setBotMessage3] = useState('');
  const [userMessage3, setUserMessage3] = useState('');
  const [showUserTyping3, setShowUserTyping3] = useState(false);

  // Full messages
  const botFullMessage = 'Do you want to grow your business?';
  const userFullMessage = 'Yes.';
  const botFullMessage2 = 'Which city are you in?';
  const userFullMessage2 = 'Beverly Hills.';
  const botFullMessage3 = 'What type of business is your business?';
  const userFullMessage3 = 'Wellness Spa.';

  // Bot typing animation for the first message
  useEffect(() => {
    if (botMessage.length < botFullMessage.length) {
      const timeout = setTimeout(() => {
        setBotMessage(botFullMessage.slice(0, botMessage.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setShowUserTyping(true);
    }
  }, [botMessage]);

  // User typing animation for the first message
  useEffect(() => {
    if (showUserTyping && userMessage.length < userFullMessage.length) {
      const timeout = setTimeout(() => {
        setUserMessage(userFullMessage.slice(0, userMessage.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (userMessage.length === userFullMessage.length) {
      setBotMessage2('');
    }
  }, [userMessage, showUserTyping]);

  // Bot typing animation for the second message
  useEffect(() => {
    if (
      userMessage.length === userFullMessage.length &&
      botMessage2.length < botFullMessage2.length
    ) {
      const timeout = setTimeout(() => {
        setBotMessage2(botFullMessage2.slice(0, botMessage2.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (botMessage2.length === botFullMessage2.length) {
      setShowUserTyping2(true);
    }
  }, [botMessage2, userMessage]);

  // User typing animation for the second message
  useEffect(() => {
    if (showUserTyping2 && userMessage2.length < userFullMessage2.length) {
      const timeout = setTimeout(() => {
        setUserMessage2(userFullMessage2.slice(0, userMessage2.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (userMessage2.length === userFullMessage2.length) {
      setBotMessage3('');
    }
  }, [userMessage2, showUserTyping2]);

  // Bot typing animation for the third message
  useEffect(() => {
    if (
      userMessage2.length === userFullMessage2.length &&
      botMessage3.length < botFullMessage3.length
    ) {
      const timeout = setTimeout(() => {
        setBotMessage3(botFullMessage3.slice(0, botMessage3.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (botMessage3.length === botFullMessage3.length) {
      setShowUserTyping3(true);
    }
  }, [botMessage3, userMessage2]);

  // User typing animation for the third message
  useEffect(() => {
    if (showUserTyping3 && userMessage3.length < userFullMessage3.length) {
      const timeout = setTimeout(() => {
        setUserMessage3(userFullMessage3.slice(0, userMessage3.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [userMessage3, showUserTyping3]);

  return (
    <div className={classes.root}>
      <div className={classes.innerSection}>
        <div className={`${classes.imgDiv} ${classes.botImageDiv}`}>
          <Image src="/bot.png" alt="Bot" width={32} height={32} />
        </div>
        <div className={classes.botMessageContainer}>
          <p className={classes.messageDiv}>{botMessage}</p>
        </div>
      </div>

      {showUserTyping && (
        <div className={classes.innerSection}>
          <div className={classes.userMessageContainer}>
            <p className={classes.messageDiv}>{userMessage}</p>
          </div>
          <div className={`${classes.imgDiv} ${classes.personImgDiv}`}>
            <Image src="/person.png" alt="Person" width={32} height={32} />
          </div>
        </div>
      )}

      {botMessage2 && (
        <div className={classes.innerSection}>
          <div className={`${classes.imgDiv} ${classes.botImageDiv}`}>
            <Image src="/bot.png" alt="Bot" width={32} height={32} />
          </div>
          <div className={classes.botMessageContainer}>
            <p className={classes.messageDiv}>{botMessage2}</p>
          </div>
        </div>
      )}

      {showUserTyping2 && (
        <div className={classes.innerSection}>
          <div className={classes.userMessageContainer}>
            <p className={classes.messageDiv}>{userMessage2}</p>
          </div>
          <div className={`${classes.imgDiv} ${classes.personImgDiv}`}>
            <Image src="/person.png" alt="Person" width={32} height={32} />
          </div>
        </div>
      )}

      {botMessage3 && (
        <div className={classes.innerSection}>
          <div className={`${classes.imgDiv} ${classes.botImageDiv}`}>
            <Image src="/bot.png" alt="Bot" width={32} height={32} />
          </div>
          <div className={classes.botMessageContainer}>
            <p className={classes.messageDiv}>{botMessage3}</p>
          </div>
        </div>
      )}

      {showUserTyping3 && (
        <div className={classes.innerSection}>
          <div className={classes.userMessageContainer}>
            <p className={classes.messageDiv}>{userMessage3}</p>
          </div>
          <div className={`${classes.imgDiv} ${classes.personImgDiv}`}>
            <Image src="/person.png" alt="Person" width={32} height={32} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroTypingAnimation;
