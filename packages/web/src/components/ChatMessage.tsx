import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  innerSec: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  botInnerSec: {
    flexDirection: 'row-reverse',
    justifyContent: 'start',
  },
  personInnerSec: {
    flexDirection: 'row',
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
  personMessageContainer: {
    backgroundColor: '#f7f7f7',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    borderRadius: `20px 20px 0 20px`,
    marginLeft: 'auto',
  },
}));

type ChatMessageProps = {
  type: 'bot' | 'person';
  message: string;
};

const ChatMessage = ({ type, message }: ChatMessageProps) => {
  const classes = useStyles();

  return (
    <>
      <div
        className={`${classes.innerSec} ${
          type === 'bot' ? classes.botInnerSec : type === 'person' && classes.personInnerSec
        }`}
      >
        <div
          className={
            type === 'bot'
              ? classes.botMessageContainer
              : type === 'person' && classes.personMessageContainer
          }
        >
          <p className={classes.messageDiv}>{message}</p>
        </div>
        <div
          className={`${classes.imgDiv} ${
            type === 'bot' ? classes.botImageDiv : type === 'person' && classes.personImgDiv
          }`}
        >
          <Image
            src={type === 'bot' ? '/bot.png' : type === 'person' && '/person.png'}
            alt="Person"
            width={32}
            height={32}
          />
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
