import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import HighlightOff from '@mui/icons-material/HighlightOff';
import MentionInput from '../common/MentionInput';
import MentionParser from '../common/MentionParser';

interface IProps {
  media: [];
  tempMedia?: any;
  removeMedia?: (arg: number) => void;
  removeTempMedia?: (arg: number) => void;
  onCaptionChange?: (arg: string, arg2: number) => void;
  onTempCaptionChange?: (arg: string, arg2: number) => void;
  showIcon?: boolean;
  authenticated?: boolean;
}

export default function MediaList({
  media = [],
  tempMedia = [],
  removeMedia,
  removeTempMedia,
  showIcon = false,
  onCaptionChange,
  onTempCaptionChange,
  authenticated,
}: IProps): any {
  return (
    <Grid container spacing={1}>
      {media.length > 0 &&
        media.map((m: any, i) => (
          <Media
            key={i}
            url={m.url}
            caption={m.caption}
            isVideo={m.url.toLowerCase().indexOf(`video`) > -1}
            showIcon={showIcon}
            onClick={() => removeMedia(i)}
            onCaptionChange={(value) => onCaptionChange(value, i)}
            authenticated={authenticated}
          />
        ))}
      {tempMedia.length > 0 &&
        tempMedia.map((m, i) => (
          <Media
            key={i}
            url={m.url}
            caption={m.caption}
            isVideo={m.type.toLowerCase().indexOf('video') > -1}
            showIcon={showIcon}
            onClick={() => removeTempMedia(i)}
            onCaptionChange={(value) => onTempCaptionChange(value, i)}
            authenticated={authenticated}
          />
        ))}
    </Grid>
  );
}

interface IMediaProps {
  url: string;
  caption: string;
  isVideo?: boolean;
  showIcon?: boolean;
  authenticated?: boolean;
  onClick: () => void;
  onCaptionChange: (arg: string) => void;
}

export const Media = ({
  url,
  caption,
  isVideo = false,
  showIcon = false,
  onClick,
  onCaptionChange,
  authenticated,
}: IMediaProps): any => {
  return (
    <Grid data-testid="media" xs={12} sm={6} item>
      <Paper variant="outlined">
        {showIcon && (
          <IconButton
            style={{
              zIndex: 3,
            }}
            onClick={onClick}
            className="position-absolute p-0 bg-danger ml-2 mt-2"
            edge="end"
            size="large"
          >
            <HighlightOff className="text-light" fontSize="large" />
          </IconButton>
        )}
        {isVideo ? (
          <video key={url} controls src={url + '#t=0.9'}>
            Your browser does not support HTML5 video.
          </video>
        ) : (
          <img src={url} className="w-100" alt="media-img" />
        )}
        <div className="p-1">
          {showIcon ? (
            <MentionInput onChange={onCaptionChange} value={caption} placeholder="Caption" />
          ) : (
            <MentionParser value={caption} className="text-center" authenticated={authenticated} />
          )}
        </div>
      </Paper>
    </Grid>
  );
};
