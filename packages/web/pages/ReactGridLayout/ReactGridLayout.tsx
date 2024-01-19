import React, { useState, useEffect, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useGetFormBySlug, getFormBySlug } from '@frontend/shared/hooks/form';
import { IField } from '@frontend/shared/types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import GridIcon from '@mui/icons-material/GridOn';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { style } from 'd3';
import { TextField } from '@mui/material';
import CRUDMenu from '../../src/components/common/CRUDMenu';
import CardComponent from '../../src/components/Spotify/SpotifyCard';
import Card from '../../src/components/card/Card';
import Spotify from '../../src/components/Spotify/SpotifyCol';
import Column from '../../src/components/response/Column';
import StyleDrawer from '../../src/components/style/StyleDrawer';

interface IState {
  editRules: boolean;
  showMenu: any;
  field: IField;
  showForm: boolean;
  editStyle: boolean;
  editGrid: boolean;
  editForm: boolean;
  showFormSettings: boolean;
  showSystemFields: boolean;
}
interface ICardState {
  isEditing: boolean;
  editedTitle: string;
  editedDescription: string;
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const FormGrid = ({ onChange, onLayoutChange, value }) => {
  const [compactType, setCompactType] = useState('No Compaction');
  const [layouts2, setLayouts2] = useState({ lg: value });
  const [dropData, setDropData] = useState({ targetLayout: '', sourceItem: [] });
  const [anchorEl, setAnchorEl] = useState(null);

  const [formData, setFormData] = useState(null);
  const [sizes, setSizes] = useState<{ [key: string]: { w: number; h: number } }>({});
  // const [editStyle, seteditstyle] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isStyleDrawerOpen, setIsStyleDrawerOpen] = useState(false);
  // const [editedTitle, setEditedTitle] = useState('');
  // const [editedDescription, setEditedDescription] = useState('');
  const [cardState, setCardState] = useState<ICardState>({
    isEditing: false,
    editedTitle: '',
    editedDescription: '',
  });
  // console.log(value, 'val in reactgridlayout');

  // const fetchData = async () => {
  //   const data = await getFormBySlug('santhanamnew');
  //   setFormData(data);
  // };
  const [isResizeEnabled, setIsResizeEnabled] = useState(false);

  const [gridItemStyles, setGridItemStyles] = useState({});

  const fetchData = async () => {
    const data = await getFormBySlug('spotifycardinfo');
    setFormData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(formData, 'formdata');

  // useEffect(() => {
  //   const { targetLayout, sourceItem } = dropData;
  //   console.log(dropData, 'ondrop layouts');
  //   if (targetLayout && sourceItem) {
  //     setDropData({ targetLayout: '', sourceItem: null });
  //     // setLayouts2((prevLayouts) => {
  //     //   const newItem = { sourceItem };
  //     //   return { lg: [...prevLayouts.lg, newItem] };
  //     // });
  //     setLayouts2((prevLayouts) => {
  //       const newItem = {
  //         sourceItem,
  //       };
  //       return { lg: [...prevLayouts.lg, newItem] };
  //     });
  //     // console.log(layouts2, 'layouts2');
  //   }
  // }, [dropData]);

  // useEffect(() => {S
  //   // Notify the parent component about changes in layouts2
  //   onLayoutChange(layouts2.lg);
  // }, [layouts2, onLayoutChange]);

  const onDragStart = (event, item, layoutKey1) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ ...item, layoutKey: layoutKey1 }));
  };

  const onDragLeave = () => {
    removeValidDropAreaIndicator();
  };

  const removeValidDropAreaIndicator = () => {
    const validDropAreas = document.querySelectorAll('.grid-item.valid-drop-area');
    validDropAreas.forEach((area) => {
      area.classList.remove('valid-drop-area');
    });
  };

  const onDrop = (targetLayout, event) => {
    event.preventDefault();
    removeValidDropAreaIndicator();
    const sourceItem = JSON.parse(event.dataTransfer.getData('text/plain'));
    // if (sourceItem) {
    //   setDropData({ targetLayout, sourceItem });
    // }
    if (sourceItem) {
      // Update the layouts state
      setLayouts2((prevLayouts) => {
        const newItem = { sourceItem };
        const updatedLayouts = [...prevLayouts.lg, newItem];
        return { lg: updatedLayouts };
      });

      onChange(layouts2);
    }
  };
  const onResize = (layout, oldItem, newItem) => {
    const updatedLayouts = layouts2.lg.map((item, index) =>
      index.toString() === oldItem.i
        ? {
            ...item,
            x: newItem.x,
            y: newItem.y,
            w: newItem.w,
            h: newItem.h,
          }
        : item,
    );

    // console.log(item, 'item');
    // Return other items unchanged

    // console.log(updatedLayouts, 'updated layouts');
    // });
    setSizes((prevSizes) => ({
      ...prevSizes,
      [oldItem.i]: { w: newItem.w, h: newItem.h },
    }));
    // console.log(sizes, 'sizes');
    // console.log(oldItem, newItem, layout, 'Resize Old Item');
    setLayouts2({ lg: updatedLayouts });
    // console.log(layouts2, 'layouts after resize');
    onLayoutChange(layouts2);
    onChange(layouts2);
  };

  const deleteButtonWrapperStyle: CSSProperties = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    zIndex: 1,
  };

  const generateDOM = () => {
    return _.map(layouts2.lg, (res, i) => {
      const response = res.sourceItem;

      // console.log(res, 'response');
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleDeleteMenuItemClick = () => {
        handleDelete(i);
        handleClose();
      };

      // const handleEditStyle = (index: number, style: any) => {
      //   field._id === fieldId ? { ...field, options: { ...field?.options, style } } : styles;
      // };
      // console.log(isStyleDrawerOpen, 'is styledrawer open?');

      const width = res.w || 2;
      const height = res.h || 2;
      const xcor = res.x || 0;
      const ycor = res.y || 0;
      // console.log(gridItemStyles, 'styles');
      const stylevalue = res.style;
      // console.log(res.style, 'response style');
      return (
        <div
          key={i}
          className="grid-item"
          style={gridItemStyle}
          data-grid={{ x: xcor, y: ycor, w: width, h: height }}
          draggable
        >
          {/* <button
            className="delete-button"
            style={deleteButtonWrapperStyle}
            onClick={() => handleDelete(i)}
          >
            Delete
          </button> */}
          <div style={deleteButtonWrapperStyle}>
            <IconButton
              aria-label="more"
              aria-controls={`menu-${i}`}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              id={`menu-${i}`}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleDeleteMenuItemClick}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
              {/* Add more menu items as needed */}
              <MenuItem onClick={null}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit Style" />
              </MenuItem>
              {/* <MenuItem onClick={() => console.log('button clicked')}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Lock" />
              </MenuItem> */}
              {/* <MenuItem onClick={() => console.log('button clicked')}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText primary=" Enable Resize" />
              </MenuItem> */}
            </Menu>
          </div>

          {/* <div dangerouslySetInnerHTML={{ __html: JSON.parse(response.values[0].value) }} /> */}
          {/* <div dangerouslySetInnerHTML={{ __html: response.values[0].value }} /> */}
          <div
            onClick={() => {
              startEditing(i);
              handleToggleStyleDrawer(i);
            }}
          >
            <CardComponent
              imageSource={response[0].values[0].value}
              title={cardState.editedTitle || response[0].values[1].value}
              description={cardState.editedDescription || response[0].values[2].value}
              height={height}
              descriptionStyles={stylevalue}
            />
          </div>

          {/* <div>
            {isStyleDrawerOpen && (
              <StyleDrawer
                onClose={() => setIsStyleDrawerOpen(false)}
                open={isStyleDrawerOpen}
                onStylesChange={() => null}
                styles={styles}
              />
            )}
          </div> */}
        </div>
      );
    });
  };
  const handleDelete = (index) => {
    // Handle delete logic
    // console.log(layouts2, 'layouts2 before delete');
    setLayouts2((prevLayouts) => {
      // console.log(prevLayouts, 'prevlayouts');
      // const updatedLayouts = [...prevLayouts.lg];

      // updatedLayouts.filter((_, i) => index !== i);

      const updatedLayouts = prevLayouts.lg.filter((random, i) => i !== index);

      // console.log({ lg: updatedLayouts }, 'updatedlayouts');
      return { lg: updatedLayouts };
    });
    // console.log(layouts2, 'layouts2 after delete');
    onChange(layouts2);
  };

  const handleToggleStyleDrawer = (index) => {
    setSelectedItemIndex(index);
    setIsStyleDrawerOpen(true);
    // handleClose();
    // setIsStyleDrawerOpen((prevIsStyleDrawerOpen) => !prevIsStyleDrawerOpen);
    // if (!isStyleDrawerOpen) {
    //   setSelectedItemIndex(index);
    // }
    setAnchorEl(null); // Close the menu
  };
  const handleEditStyle = (newstyle: any) => {
    setGridItemStyles((prevStyles) => ({
      ...prevStyles,
      [selectedItemIndex]: { ...prevStyles[selectedItemIndex], ...newstyle },
    }));
    // console.log(gridItemStyles, 'inside handle edit style');
    // Update the corresponding layout object
    setLayouts2((prevLayouts) => {
      const updatedLayouts = prevLayouts.lg.map((item, index) =>
        index === selectedItemIndex
          ? {
              ...item,
              style: { ...item.style, ...newstyle },
            }
          : item,
      );
      // console.log(updatedLayouts, 'after styles');
      return { lg: updatedLayouts };
    });
    onLayoutChange(layouts2);

    onChange(layouts2);
  };
  // const startEditing = () => {
  //   setCardState({
  //     isEditing: true,
  //     editedTitle: title,
  //     editedDescription: description,
  //   });
  // };
  // const finishEditing = () => {
  //   setCardState((prevState) => ({
  //     ...prevState,
  //     isEditing: false,
  //   }));
  // };

  const startEditing = (index) => {
    if (index === selectedItemIndex) {
      setCardState({
        isEditing: true,
        editedTitle: '',
        editedDescription: '',
      });
    }
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardState((prevState) => ({
      ...prevState,
      editedTitle: event.target.value,
    }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardState((prevState) => ({
      ...prevState,
      editedDescription: event.target.value,
    }));
  };

  const gridItemStyle: React.CSSProperties = {
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
    cursor: 'move',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    position: 'relative',
    overflow: 'hidden',
  };

  const containerStyle = {
    border: '5px solid #ddd',
    height: '100%',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '5px',
  };

  const gridContainerStyle = {
    border: '5px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
    display: 'flex',
    height: '100%',
    width: '100%',
  };

  const responseListContainerStyle = {
    border: '5px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
    display: 'flex',
  };

  // const dragAreaStyle = {
  //   border: '5px solid #ddd',
  //   borderRadius: '5px',
  //   marginBottom: '20px',
  //   borderColor: 'black',
  //   height: '100%',
  //   width: '100%',
  // };

  const dragAreaStyle = {
    border: '5px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
    borderColor: isResizeEnabled ? 'black' : 'gray',
    height: '1200px', // Set your desired initial height
    width: '80%', // Set your desired initial width
    margin: 'auto', // Center the container horizontally
  };
  const textFieldsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
  };

  return (
    <div style={containerStyle}>
      <div>
        <IconButton onClick={handleToggleStyleDrawer} style={{ position: 'absolute', right: 0 }}>
          <ChevronRight />
        </IconButton>
        <StyleDrawer
          onClose={() => setIsStyleDrawerOpen(false)}
          open={isStyleDrawerOpen}
          onStylesChange={(newvalue) => handleEditStyle(newvalue)}
          styles={gridItemStyles[selectedItemIndex]}
        />
      </div>

      <div style={responseListContainerStyle}>
        {/* <Column form={formData} /> */}
        <Spotify form={formData} />
      </div>

      <div style={gridContainerStyle}>
        <div style={textFieldsContainerStyle}>
          <TextField
            label="Edit Title"
            value={cardState.editedTitle}
            onChange={handleTitleChange}
          />
          <TextField
            label="Edit Description"
            value={cardState.editedDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div
          style={dragAreaStyle}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop('layouts2' || 'layouts1', e)}
        >
          <ResponsiveReactGridLayout
            compactType={compactType}
            onResize={onResize}
            onDragStart={onResize}
          >
            {generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    </div>
  );
};

// Use the prop types in your component
FormGrid.propTypes = {
  onChange: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default FormGrid;
