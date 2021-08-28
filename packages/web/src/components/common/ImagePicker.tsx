import Button from '@material-ui/core/Button';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ImageList from '../post/ImageList';

interface IProps {
  state: any;
  setState: any;
}

export default function ImagePicker({ state, setState }: IProps) {
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      let newArray = [...state.tempMedia];
      for (let i = 0; i < event.target.files.length; i++) {
        let item = {
          url: URL.createObjectURL(event.target.files[i]),
          type: event.target.files[i].type,
          caption: '',
        };
        newArray.push(item);
      }
      setState({
        ...state,
        tempMediaFiles: [...state.tempMediaFiles, ...event.target.files],
        tempMedia: newArray,
      });
    }
  };

  const onTempCaptionChange = (value: string, index: number) => {
    setState({
      ...state,
      tempMedia: state.tempMedia.map((t, i) => (i === index ? { ...t, caption: value } : t)),
    });
  };

  const onCaptionChange = (value: string, index: number) => {
    setState({
      ...state,
      media: state.media.map((t, i) => (i === index ? { ...t, caption: value } : t)),
    });
  };

  const handleRemoveMedia = (index: number) => {
    let urlArray = [...state.media];
    urlArray.splice(index, 1);
    setState({ ...state, media: urlArray });
  };

  const handleRemoveTempMedia = (index: number) => {
    let fileArray = [...state.tempMediaFiles];
    let urlArray = [...state.tempMedia];
    fileArray.splice(index, 1);
    urlArray.splice(index, 1);
    setState({ ...state, tempMedia: urlArray, tempMediaFiles: fileArray });
  };

  return (
    <>
      <input
        id="contained-button-file"
        type="file"
        multiple
        accept="image/*, video/*"
        hidden
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          size="small"
          variant="outlined"
          component="span"
          color="primary"
          className="mb-2"
          startIcon={<PhotoLibraryIcon />}>
          Select Image/Video
        </Button>
      </label>
      <ImageList
        showIcon={true}
        media={state.media}
        tempMedia={state.tempMedia}
        removeTempMedia={handleRemoveTempMedia}
        removeMedia={handleRemoveMedia}
        onTempCaptionChange={onTempCaptionChange}
        onCaptionChange={onCaptionChange}
      />
    </>
  );
}
