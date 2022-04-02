/* eslint-disable jsx-a11y/media-has-caption */
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import HighlightOff from '@mui/icons-material/HighlightOff';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
// import MentionParser from "./MentionParser";
// import MentionInput from "./MentionInput";

interface IProps {
  media: [];
  tempMedia?: any;
  selected: any;
  setSelected: any;
}

export default function MediaList({
  media = [],
  tempMedia = [],
  selected,
  setSelected,
}: IProps): any {
  return (
    <Grid container spacing={1}>
      {media.length > 0 &&
        media.map((m: any, i) => (
          <Media key={i} url={m.url} selected={selected} setSelected={setSelected} />
        ))}
      {tempMedia.length > 0 &&
        tempMedia.map((m, i) => (
          <Media key={i} url={m.url} selected={selected} setSelected={setSelected} />
        ))}
    </Grid>
  );
}

interface IMediaProps {
  url: string;
  isVideo?: boolean;
  selected: any;
  setSelected: any;
}

export const Media = ({ url, isVideo = false, selected, setSelected }: IMediaProps): any => {
  const [isSelected, setIsSelected] = useState(false);
  const removeSelected = (newSelected, data) => {
    newSelected.splice(newSelected.indexOf(data), 1);
    return newSelected;
  };
  useEffect(() => {
    if (isSelected) {
      setSelected([...selected, url]);
    } else {
      setSelected([...removeSelected(selected, url)]);
    }
  }, [isSelected]);

  return (
    <Grid item data-testid="media" xs={12} sm={6} md={3}>
      <Paper variant="outlined">
        {isVideo ? (
          <>
            <IconButton
              style={{
                zIndex: 3,
              }}
              onClick={() => setIsSelected(!isSelected)}
              className="position-absolute p-0 bg-white ml-2 mt-2"
              edge="end"
              size="large"
            >
              {isSelected ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>
            <video key={url} controls src={`${url}#t=0.9`}>
              Your browser does not support HTML5 video.
            </video>
          </>
        ) : (
          <>
            <IconButton
              style={{
                zIndex: 3,
              }}
              onClick={() => setIsSelected(!isSelected)}
              className="position-absolute p-0 bg-white ml-2 mt-2"
              edge="end"
              size="large"
            >
              {isSelected ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>
            <img src={url} className="w-100" alt="media-img" />
          </>
        )}
      </Paper>
    </Grid>
  );
};
