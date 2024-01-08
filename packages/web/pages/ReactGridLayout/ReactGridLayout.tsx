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
import CRUDMenu from '../../src/components/common/CRUDMenu';
import CardComponent from '../../src/components/Spotify/SpotifyCard';
import Card from '../../src/components/card/Card';
import Spotify from '../../src/components/Spotify/SpotifyCol';
import Column from '../../src/components/response/Column';

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
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const FormGrid = ({ onChange, onLayoutChange, value }) => {
  // const initialValues: IState = {
  //   editRules: null,
  //   showMenu: null,
  //   field: {
  //     _id: '6597a371db8332f135a5c4e4',
  //     label: 'ReactGridLayoutEditor',
  //     fieldType: 'reactgridlayouteditor',
  //     options: {
  //       physicalQuantity: '',
  //       unit: '',
  //       default: false,
  //       selectItem: false,
  //       dependentRelationship: false,
  //       twoWayRelationship: false,
  //       relationLabel: '',
  //       relationFieldId: '',
  //       showOptionCreatedByUser: false,
  //       showOptionCreatedOnTemplate: false,
  //       required: false,
  //       multipleValues: false,
  //       uniqueBetweenMultipleValues: false,
  //       uniqueSubField: null,
  //       unique: false,
  //       caseInsensitiveUnique: false,
  //       staticText: '',
  //       formField: '',
  //       showCommentBox: false,
  //       showStarRating: false,
  //       notEditable: false,
  //       systemCalculatedAndSaved: false,
  //       systemValue: null,
  //       systemCalculatedAndView: false,
  //       formula: null,
  //       showAsCheckbox: false,
  //       selectAllowCreate: false,
  //       selectOptions: [''],
  //       conditions: [],
  //       defaultValue: null,
  //       hidden: false,
  //       hiddenConditions: null,
  //       disabled: false,
  //       disabledConditions: null,
  //       showAsAddButton: false,
  //       selectOfFieldProps: false,
  //       conditionRightPart: false,
  //       engagementForms: null,
  //     },
  //     template: null,
  //     form: null,
  //   },
  //   showForm: false,
  //   editStyle: false,
  //   editGrid: false,
  //   editForm: false,
  //   showFormSettings: false,
  //   showSystemFields: false,
  // };

  const [compactType, setCompactType] = useState('No Compaction');
  const [layouts2, setLayouts2] = useState({ lg: value });
  const [dropData, setDropData] = useState({ targetLayout: '', sourceItem: [] });
  const [anchorEl, setAnchorEl] = useState(null);

  const [formData, setFormData] = useState(null);
  // console.log(value, 'val in reactgridlayout');

  const fetchData = async () => {
    const data = await getFormBySlug('santhanamnew');
    setFormData(data);
  };
  // const fetchData = async () => {
  //   const data = await getFormBySlug('spotifycardinfo');
  //   setFormData(data);
  // };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(formData, 'formdata');

  useEffect(() => {
    const { targetLayout, sourceItem } = dropData;
    if (targetLayout && sourceItem) {
      setDropData({ targetLayout: '', sourceItem: null });
      setLayouts2((prevLayouts) => {
        const newItem = { sourceItem };
        return { lg: [...prevLayouts.lg, newItem] };
      });
      // console.log(layouts2, 'layouts2');
    }
  }, [dropData]);

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
    if (sourceItem) {
      setDropData({ targetLayout, sourceItem });
    }

    // console.log(layouts2, 'ondrop layouts');
    onChange(layouts2);
  };
  // const onDrop = (targetLayout, event) => {
  //   event.preventDefault();
  //   removeValidDropAreaIndicator();
  //   const sourceItem = JSON.parse(event.dataTransfer.getData('text/plain'));

  //   if (sourceItem) {
  //     setDropData({ targetLayout, sourceItem });
  //     setLayouts2(
  //       (prevLayouts) => {
  //         const newItem = { sourceItem };
  //         const updatedLayouts = [...prevLayouts.lg, newItem];
  //         return { lg: updatedLayouts };
  //       },
  //       () => {
  //         onChange(layouts2);
  //       },
  //     );
  //   }
  // };
  const deleteButtonWrapperStyle: CSSProperties = {
    position: 'absolute',
    top: '5px',
    right: '5px',
  };

  const generateDOM = () => {
    return _.map(layouts2.lg, (res, i) => {
      const response = res.sourceItem;
      // console.log(res, 'resd');
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
      return (
        <div key={i} className="grid-item" style={gridItemStyle} draggable>
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
            </Menu>
          </div>

          {/* <div dangerouslySetInnerHTML={{ __html: JSON.parse(response.values[0].value) }} /> */}
          <div dangerouslySetInnerHTML={{ __html: response.values[0].value }} />
          {/* <CardComponent
            imageSource={response[0].values[0].value}
            title={response[0].values[1].value}
            description={response[0].values[2].value}
          /> */}
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
      /* eslint-disable no-shadow */
      const updatedLayouts = prevLayouts.lg.filter((i) => i !== index);
      /* eslint-enable no-shadow */

      // console.log({ lg: updatedLayouts }, 'updatedlayouts');
      return { lg: updatedLayouts };
    });
    // console.log(layouts2, 'layouts2 after delete');
    onChange(layouts2);
  };

  const gridItemStyle = {
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
    cursor: 'move',
    height: '200px',
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
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
  };

  // const dragAreaStyle = {
  //   border: '5px solid #ddd',
  //   borderRadius: '5px',
  //   marginBottom: '20px',
  //   borderColor: 'black',
  //   height: '100%',
  //   width: '100%',
  // };
  // const Spotifydata = [
  //   {
  //     imageSource: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
  //     title: 'Title 1',
  //     description: 'Description 1',
  //   },
  //   {
  //     imageSource: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
  //     title: 'Title 2',
  //     description: 'Description 2',
  //   },
  //   {
  //     imageSource: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
  //     title: 'Title 3',
  //     description: 'Description 3',
  //   },
  //   {
  //     imageSource: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
  //     title: 'Title 4',
  //     description: 'Description 4',
  //   },
  //   {
  //     imageSource: 'https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',
  //     title: 'Title 5',
  //     description: 'Description 5',
  //   },
  // ];
  const dragAreaStyle = {
    border: '5px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
    borderColor: 'black',
    height: '500px', // Set your desired initial height
    width: '80%', // Set your desired initial width
    margin: 'auto', // Center the container horizontally
  };

  return (
    <div style={containerStyle}>
      <div style={gridContainerStyle}>
        <div style={responseListContainerStyle}>
          <Column form={formData} />
          {/* <Spotify form={formData} /> */}
        </div>
        <div
          style={dragAreaStyle}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop('layouts2' || 'layouts1', e)}
        >
          <ResponsiveReactGridLayout compactType={compactType}>
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
