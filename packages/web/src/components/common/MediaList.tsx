import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import HighlightOff from '@material-ui/icons/HighlightOff';
import MentionInput from '../common/MentionInput';
import MentionParser from '../common/MentionParser';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useEffect, useState } from 'react';

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
  console.log('selected', selected);
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
  const removeSelected = (selected, data) => {
    selected.splice(selected.indexOf(data), 1);
    return selected;
  };
  useEffect(() => {
    isSelected ? setSelected([...selected, url]) : setSelected([...removeSelected(selected, url)]);
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
            >
              {isSelected ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>
            <video key={url} controls src={url + '#t=0.9'}>
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
