import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import HighlightOff from '@material-ui/icons/HighlightOff';

interface IProps {
  images: [];
  tempImages?: any;
  removeImage?: (arg: number) => void;
  removeTempImage?: (arg: number) => void;
  showIcon?: boolean;
}

export default function ImageList({
  images = [],
  tempImages = [],
  removeImage,
  removeTempImage,
  showIcon = false,
}: IProps) {
  return (
    <Grid container spacing={1}>
      {images.length > 0 &&
        images.map((media: any, i) => (
          <Media
            key={i}
            url={media}
            isVideo={media.toLowerCase().indexOf(`video`) > -1}
            showIcon={showIcon}
            onClick={() => removeImage(i)}
            type={`video/${media.split('.').pop().toLowerCase()}`}
          />
        ))}
      {tempImages.length > 0 &&
        tempImages.map((media, i) => (
          <Media
            key={i}
            url={media.url}
            isVideo={media.type.toLowerCase().indexOf('video') > -1}
            showIcon={showIcon}
            onClick={() => removeTempImage(i)}
            type={media.type}
          />
        ))}
    </Grid>
  );
}

interface IMediaProps {
  url: string;
  type?: string;
  isVideo?: boolean;
  showIcon?: boolean;
  onClick: () => void;
}

const Media = ({ url, type, isVideo = false, showIcon = false, onClick }: IMediaProps) => {
  return (
    <Grid xs={12} sm={6} item>
      {showIcon && (
        <IconButton
          style={{
            zIndex: 3,
          }}
          onClick={onClick}
          className="position-absolute p-0 bg-danger ml-2 mt-2"
          edge="end">
          <HighlightOff className="text-light" fontSize="large" />
        </IconButton>
      )}
      {isVideo ? (
        <video key={url} controls src={url}>
          {/* <source src={url} type={type} /> */}
          Your browser does not support HTML5 video.
        </video>
      ) : (
        <img src={url} className="w-100" />
      )}
    </Grid>
  );
};
