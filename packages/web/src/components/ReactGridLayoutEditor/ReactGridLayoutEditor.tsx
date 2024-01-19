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
import EditIcon from '@mui/icons-material/Edit';
import { to } from 'mathjs';
import StyleDrawer from '../style/StyleDrawerCopy';
import ChevronRight from '@mui/icons-material/ChevronRight';

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
  const [sizes, setSizes] = useState<{ [key: string]: { w: number; h: number } }>({});
  const [isStyleDrawerOpen, setisStyleDrawerOpen] = useState(null);
  const [gridItemStyles, setGridItemStyles] = useState({});
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isStatic, setIsStatic] = useState(false);

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
    zIndex: 2,
  };

  const handleDelete = (i) => {
    // console.log('Is this the delete operation');
    const updatedLayouts = layouts2.filter((item, index) => index !== i);
    setLayouts2(updatedLayouts);
    onLayoutChange(updatedLayouts);
    onChange(updatedLayouts);
  };

  const onResize = (layout, oldItem, newItem) => {
    // console.log(oldItem, 'newItem layout');

    const updatedLayout = layouts2.map((item, index) =>
      // console.log(item,oldItem.i,"This is item")
      index.toString() === oldItem.i
        ? { ...item, x: newItem.x, y: newItem.y, w: newItem.w, h: newItem.h }
        : item,
    );
    // setSizes((prevSizes) => ({
    //   ...prevSizes,
    //   [oldItem.i]: { w: newItem.w, h: newItem.h },
    // }));

    setLayouts2(updatedLayout);
    onLayoutChange(updatedLayout);
    onChange(updatedLayout);
  };

  const styles = {};

  const handleStylesClose = () => {
    setisStyleDrawerOpen(false);
  };

  const handleToggleStyleDrawer = (index) => {
    console.log(index, 'This is the index');
    setSelectedItemIndex(index);
    setisStyleDrawerOpen(true);
    setAnchorEl(null);
    // setIsStatic(!isStatic);
    // console.log(isStatic,"isStatic")
  };

  const generateDOM = () => {
    return _.map(layouts2, (res, i) => {
      const response = res;
      console.log(response, 'This is the response after changesss');
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // setisStyleDrawerOpen(true);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleDeleteMenuItemClick = (layoutKey) => {
        // console.log(layoutKey, 'This is in delete');
        handleDelete(layoutKey.i);
        handleClose();
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
          draggable={!isStatic}
          data-grid={{
            x: response.x || 0,
            y: response.y || 0,
            w: response.w || 2,
            h: response.h || 2,
            static: !isStatic,
          }}
        >
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
              <MenuItem onClick={() => handleDeleteMenuItemClick({ i })}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
              <MenuItem onClick={() => handleToggleStyleDrawer(i)}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Change Styles" />
              </MenuItem>
            </Menu>
          </div>
          <div onClick={() => handleToggleStyleDrawer(i)}>
            <CardComponent
              imageSource={response[0].values[0].value}
              title={response[0].values[1].value}
              description={response[0].values[2].value}
              width={response.w}
              height={response.h}
              descriptionStyles={response.styles}
            />
          </div>
          {isStyleDrawerOpen && (
            <StyleDrawer
              onClose={() => setisStyleDrawerOpen(false)}
              open={isStyleDrawerOpen}
              onStylesChange={(value) => handleEditStyle(value)}
              onTitleChange={(value) => handleTitleData(value)}
              onDesChange={(value) => handleDesData(value)}
              styles={gridItemStyles[selectedItemIndex]}
              title={layouts2[selectedItemIndex][0].values[1].value}
              description={layouts2[selectedItemIndex][0].values[2].value}
            />
          )}
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

  const handleEditStyle = (style: any) => {
    setGridItemStyles((prevStyles) => ({
      ...prevStyles,
      [selectedItemIndex]: { ...prevStyles[selectedItemIndex], ...style },
    }));

    // const handleValueChange = (style: any) => {

    const updatedLayout = layouts2.map((item, index) =>
      // console.log(item,oldItem.i,"This is item")
      index === selectedItemIndex ? { ...item, styles: { ...styles, ...style } } : item,
    );

    setLayouts2(updatedLayout);
    onLayoutChange(updatedLayout);
    onChange(updatedLayout);
  };

  const handleTitleData = (value) => {
    console.log('dsf', layouts2[selectedItemIndex][0].values[1].value);
    // layouts2[selectedItemIndex][0].values[1].value = value
    // // let updatedObject = { ...layouts2, layouts2[selectedItemIndex][0].values[1].value : value }

    const updatedLayouts2 = [...layouts2];

    const selectedLayout = { ...updatedLayouts2[selectedItemIndex][0] };

    selectedLayout.values = [...selectedLayout.values];
    selectedLayout.values[1].value = value.value;
    updatedLayouts2[selectedItemIndex][0] = selectedLayout;

    setLayouts2(updatedLayouts2);
    onLayoutChange(updatedLayouts2);
    onChange(updatedLayouts2);
    generateDOM();
    console.log(updatedLayouts2, 'This is the new tihng');
  };

  const handleDesData = (value) => {
    const updatedLayouts2 = [...layouts2];

    const selectedLayout = { ...updatedLayouts2[selectedItemIndex][0] };

    selectedLayout.values = [...selectedLayout.values];
    selectedLayout.values[2].value = value.value;
    updatedLayouts2[selectedItemIndex][0] = selectedLayout;
    console.log(updatedLayouts2, 'This is the new desss');
    setLayouts2(updatedLayouts2);
    onLayoutChange(updatedLayouts2);
    onChange(updatedLayouts2);
    generateDOM();
  };
  const handleToggleStatic = () => {
    setIsStatic(!isStatic);
    console.log(isStatic, 'isStatic');
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button onClick={handleToggleStatic}>Toggle Static: {isStatic ? 'On' : 'Off'}</button>
      </div>
      <div style={gridContainerStyle}>
        <div style={responseListContainerStyle}>{render && <ResponseList form={formData} />}</div>
        <div
          style={dragAreaStyle}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop('layouts2' || 'layouts1', e)}
        >
          <ResponsiveReactGridLayout
            compactType={compactType}
            onResize={onResize}
            onDragStart={onResize}
            // static = {true}
          >
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
