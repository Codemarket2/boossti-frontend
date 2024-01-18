import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import ReactCardFlip from 'react-card-flip';

const useStyles = makeStyles({
  card: {
    width: 300,
    height: 400,
    perspective: '1000px',
    transition: 'transform 0.6s',
  },
  cardFront: {
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  flipBox: {
    // minHieght  : "15vh",
    minHieght: '20vh',
    hieght: '15vh',
  },
});

function FlippingCard() {
  const classes = useStyles();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseOver = () => {
    setIsFlipped(true);
  };
  const handleMouseOut = () => {
    setIsFlipped(false);
  };
  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className={classes.flipBox} onMouseEnter={handleMouseOver}>
          <Card>
            <CardContent>
              {/* //Front Side  */}

              <CardMedia
                component="img"
                height="100"
                image="/humanQuestionMark.jpg"
                alt="Human Question Mark"
              />

              <h2>Front Side</h2>
            </CardContent>
          </Card>
        </div>
        <div className={classes.flipBox} onBlur={handleMouseOut}>
          <Card style={{ minHeight: '28vh' }}>
            <CardContent>
              {/* Back Side */}

              <h2>Back Side</h2>
            </CardContent>
          </Card>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlippingCard;
