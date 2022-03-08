import { generateObjectId } from '@frontend/shared/utils/objectId';
import { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ImageList from '../post/ImageList';

interface IProps {
  label?: string;
  fileType?: string;
  mutiple?: boolean;
  state: any;
  setState: any;
}

export default function ImagePicker({
  label = 'Select Image/Video',
  fileType = 'image/*, video/*',
  mutiple = false,
  state,
  setState,
}: IProps): any {
  const [id, setId] = useState('');
  const ref: any = useRef();
  const newArray = state.tempMedia?.length > 0 ? [...state.tempMedia] : [];

  useEffect(() => {
    setId(generateObjectId());
  }, []);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const item = {
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
      ref.current.value = null;
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
    const urlArray = [...state.media];
    urlArray.splice(index, 1);
    setState({ ...state, media: urlArray });
  };

  const handleRemoveTempMedia = (index: number) => {
    const fileArray = [...state.tempMediaFiles];
    const urlArray = [...state.tempMedia];
    fileArray.splice(index, 1);
    urlArray.splice(index, 1);
    setState({ ...state, tempMedia: urlArray, tempMediaFiles: fileArray });
  };

  return (
    <>
      {(mutiple || (!state?.media?.length && !state?.tempMedia?.length)) && (
        <>
          <input
            id={`contained-button-file-${id}`}
            type="file"
            multiple={mutiple}
            accept={fileType}
            hidden
            onChange={handleFileChange}
            ref={ref}
          />
          <label htmlFor={`contained-button-file-${id}`}>
            <Button
              size="small"
              variant="outlined"
              component="span"
              color="primary"
              className="mb-2"
              startIcon={<PhotoLibraryIcon />}
            >
              {label}
            </Button>
          </label>
        </>
      )}
      <ImageList
        showIcon
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
