import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import ResponseList from '../response/ResponseListSpotify';
import { getFormBySlug } from '@frontend/shared/hooks/form';
import CardComponent from '../Spotify/SpotifyCard';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface DragFromOutsideLayoutProps {
  value: any;
  onLayoutChange: (layouts: Layout[]) => void;
  onChange: (layouts: Layout[]) => void;
  render?: boolean;
}

const DragFromOutsideLayout: React.FC<DragFromOutsideLayoutProps> = ({
  value,
  onLayoutChange,
  onChange,
  render = true,
}) => {
  const [compactType, setCompactType] = useState<string>('No Compaction');
  const [layouts2, setLayouts2] = useState<Layout[]>(value);
  const [dropData, setDropData] = useState<{ targetLayout: string; sourceItem: Layout | null }>({
    targetLayout: '',
    sourceItem: null,
  });
  const [formData, setFormData] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchData = async () => {
    const data = await getFormBySlug('spotify-card-details');
    setFormData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const { targetLayout, sourceItem } = dropData;
    if (targetLayout && sourceItem) {
      setDropData({ targetLayout: '', sourceItem: null });
      setLayouts2((prevLayouts) => [...prevLayouts, sourceItem]);
    }
  }, [dropData]);

  useEffect(() => {
    onLayoutChange(layouts2);
  }, [layouts2, onLayoutChange]);

  const onDragStart = (event: React.DragEvent, item: Layout, layoutKey1: string) => {
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

  const onDrop = (targetLayout: string, event: React.DragEvent) => {
    event.preventDefault();
    removeValidDropAreaIndicator();
    const sourceItem = JSON.parse(event.dataTransfer.getData('text/plain'));
    if (sourceItem) {
      setDropData({ targetLayout, sourceItem });
    }
    const newThing = [...layouts2, sourceItem];
    onChange(newThing);
  };
  const deleteButtonWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    top: '5px',
    right: '5px',
  };
  const handleDelete = (i) => {
    console.log('Is this the delete operation');
    const updatedLayouts = layouts2.filter((item, index) => index !== i);
    setLayouts2(updatedLayouts);
    onLayoutChange(updatedLayouts);
    onChange(updatedLayouts);
  };
  const generateDOM = () => {
    return _.map(layouts2, (res, i) => {
      const response = res;

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

      const gridItemStyle: React.CSSProperties = {
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px',
        cursor: 'move',
        height: '400px',
        width: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        position: 'relative',
      };

      const deleteButtonStyle: React.CSSProperties = {
        position: 'absolute',
        top: '5px',
        right: '5px',
        padding: '5px',
        background: '#ff0000',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
      };

      return (
        <div
          key={i}
          className={`grid-item`}
          style={gridItemStyle}
          draggable={true}
          data-grid={{ x: 0, y: 0, w: 2, h: 2 }}
        >
          {/* <button onClick={handleDelete} className="delete-button" style={deleteButtonStyle}>
          &#x2715;
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
            </Menu>
          </div>
          {/* fdgdgdfg */}
          <CardComponent
            imageSource={response[0].values[0].value}
            title={response[0].values[1].value}
            description={response[0].values[2].value}
          />
        </div>
      );
    });
  };

  const containerStyle: React.CSSProperties = {
    border: '5px solid #ddd',
    height: '100%',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '5px',
  };

  const gridContainerStyle: React.CSSProperties = {
    border: '5px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
    display: 'flex',
    height: '100%',
    width: '100%',
  };

  const responseListContainerStyle: React.CSSProperties = {
    border: '5px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
  };

  const dragAreaStyle: React.CSSProperties = {
    border: '5px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
    borderColor: 'black',
    flex: '1',
  };

  return (
    <div style={containerStyle}>
      <div style={gridContainerStyle}>
        <div style={responseListContainerStyle}>{render && <ResponseList form={formData} />}</div>
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

DragFromOutsideLayout.propTypes = {
  value: PropTypes.array,
  onLayoutChange: PropTypes.func.isRequired,
};

export default DragFromOutsideLayout;
