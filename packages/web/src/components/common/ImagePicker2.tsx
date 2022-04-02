/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { generateObjectId } from '@frontend/shared/utils/objectId';
import { useEffect, useRef, useState } from 'react';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useGetResponses } from '@frontend/shared/hooks/response';
import SaveIcon from '@mui/icons-material/Save';
import ImageList from '../post/ImageList';
import MediaList from './MediaList';

interface IProps {
  label?: string;
  fileType?: string;
  mutiple?: boolean;
  state: any;
  setState: any;
  formId?: any;
}
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 500,
}));

export default function ImagePicker2({
  label = 'Select Image/Video',
  fileType = 'image/*, video/*',
  mutiple = false,
  state,
  setState,
  formId,
}: IProps): any {
  const [id, setId] = useState('');
  const ref: any = useRef();
  const newArray = state?.tempMedia?.length > 0 ? [...state.tempMedia] : [];
  const { data, error, loading, refetch } = useGetResponses(formId);

  useEffect(() => {
    setId(generateObjectId());
  }, []);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      // eslint-disable-next-line no-plusplus
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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const tempArr = [];
    selected.forEach((select) => {
      const temp = {
        caption: '',
        type: 'image/jpeg',
        url: '',
      };
      temp.url = select;
      tempArr.push(temp);
    });
    setState({ ...state, media: tempArr });
  }, [selected]);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {(mutiple || (!state?.media?.length && !state?.tempMedia?.length)) && (
        <>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open Library
          </Button>
          <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">Upload Media</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You can browse previous uploaded media files and upload new files.
              </DialogContentText>
              <StyledDiv>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Image/Video Library" {...a11yProps(0)} />
                    <Tab label="Upload New" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <Typography>Select uploaded Image</Typography>
                    {/* <div className={classes.imageListRoot}>
                      <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                        {data?.getResponses?.data?.map((res) => (
                          <ImageListItem key={res?.values[0]?.media} cols={res.cols || 1}>
                            <img src={res.img} alt={res.title} />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </div> */}
                    {data?.getResponses?.data?.map((res) =>
                      res?.values?.map((v) =>
                        v?.media?.length >= 1 ? (
                          <MediaList
                            media={v?.media}
                            selected={selected}
                            setSelected={setSelected}
                          />
                        ) : null,
                      ),
                    )}
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className="m-2"
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <label htmlFor={`contained-button-file-${id}`}>
                      <Button
                        size="small"
                        variant="outlined"
                        component="span"
                        color="primary"
                        className="mb-2"
                        startIcon={<PhotoLibraryIcon />}
                      >
                        Select Image/Video
                      </Button>
                    </label>
                    <input
                      id={`contained-button-file-${id}`}
                      type="file"
                      multiple={mutiple}
                      accept={fileType}
                      hidden
                      onChange={handleFileChange}
                      ref={ref}
                    />
                  </TabPanel>
                </SwipeableViews>
              </StyledDiv>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
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
