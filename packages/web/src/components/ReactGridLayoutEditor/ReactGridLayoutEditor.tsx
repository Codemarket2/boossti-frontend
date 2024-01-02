// DragFromOutsideLayout.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ResponseList from '../response/ResponseListcopy';
import { useGetFormBySlug, getFormBySlug } from '@frontend/shared/hooks/form';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DragFromOutsideLayout = ({ value, onLayoutChange, onChange }) => {
  const [compactType, setCompactType] = useState('No Compaction');
  const [layouts2, setLayouts2] = useState({ lg: value });
  const [dropData, setDropData] = useState({ targetLayout: '', sourceItem: null });
  const [formData, setFormData] = useState(null);

  const fetchData = async () => {
    const data = await getFormBySlug('canva_demo');
    setFormData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const { targetLayout, sourceItem } = dropData;
    if (targetLayout && sourceItem) {
      setDropData({ targetLayout: '', sourceItem: null });
      setLayouts2((prevLayouts) => {
        const newItem = { sourceItem };
        return { lg: [...prevLayouts.lg, newItem] };
      });
    }
  }, [dropData]);

  useEffect(() => {
    // Notify the parent component about changes in layouts2
    onLayoutChange(layouts2);
  }, [layouts2, onLayoutChange]);

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
    onChange(layouts2);
  };

  const generateDOM = () => {
    return _.map(layouts2.lg, (res, i) => {
      const [h, form, response] = res.sourceItem;
      return (
        <div key={i} className={`grid-item`} style={gridItemStyle} draggable={true}>
          <div>{response.values[0].value}</div>
        </div>
      );
    });
  };

  const gridItemStyle = {
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '20px',
    cursor: 'move',
    height: '50px',
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

  const dragAreaStyle = {
    border: '5px solid #ddd',
    borderRadius: '5px',
    marginBottom: '20px',
    borderColor: 'black',
    height: '100%',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <div style={gridContainerStyle}>
        <div style={responseListContainerStyle}>
          {/* Replace this with your actual content */}
          <ResponseList form={formData} />
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

// Prop types validation
DragFromOutsideLayout.propTypes = {
  layout_passed: PropTypes.array, // Assuming layout_passed is an array
  onLayoutChange: PropTypes.func.isRequired,
};

export default DragFromOutsideLayout;
