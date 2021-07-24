import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import HighlightOff from '@material-ui/icons/HighlightOff';

interface IProps {
  images: [];
  tempImages?: [];
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
        images.map((image, i) => (
          <Grid key={i} xs={12} sm={6} item>
            {showIcon && (
              <IconButton onClick={() => removeImage(i)} className="position-absolute">
                <HighlightOff color="error" fontSize="large" />
              </IconButton>
            )}
            <img src={image} className="w-100" />
          </Grid>
        ))}
      {tempImages.length > 0 &&
        tempImages.map((image, i) => (
          <Grid key={i} xs={12} sm={6} item>
            {showIcon && (
              <IconButton onClick={() => removeTempImage(i)} className="position-absolute">
                <HighlightOff color="error" fontSize="large" />
              </IconButton>
            )}
            <img src={image} className="w-100" />
          </Grid>
        ))}
    </Grid>
  );
}
