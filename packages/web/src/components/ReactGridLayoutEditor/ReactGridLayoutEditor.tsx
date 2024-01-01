import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Link from 'next/link';
import ResponseList from '../response/ResponseListcopy';
import moment from 'moment';
import { useGetFormBySlug, getForm, getFormBySlug } from '@frontend/shared/hooks/form';
import DisplayFormDashboardBySlug from '../form2/FormDashboardcopy';
import FieldValuesMap from '../response/FieldValuesMap';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DragFromOutsideLayout = () => {
  const [compactType, setCompactType] = useState('No Compaction');
  const [layouts2, setLayouts2] = useState({ lg: [] });
  const [dropData, setDropData] = useState({ targetLayout: '', sourceItem: null });
  const [formData, setFormData] = useState(null);
  // console.log(formData,"Form in the layout")
  const onDragStart = (event, item, layoutKey1) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ ...item, layoutKey: layoutKey1 }));
  };

  const MyHTMLComponent = ({ htmlContent }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
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
    console.log(sourceItem, 'Dropped form');
    if (sourceItem) {
      setDropData({ targetLayout, sourceItem });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFormBySlug('canva_demo');
      setFormData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const { targetLayout, sourceItem } = dropData;
    console.log(dropData, layouts2, 'In the use effect');
    if (targetLayout && sourceItem) {
      setDropData({ targetLayout: '', sourceItem: null });
      setLayouts2((prevLayouts) => {
        const newItem = { sourceItem };
        return { lg: [...prevLayouts.lg, newItem] };
      });
    }
  }, [dropData]);

  const generateDOM = () => {
    return _.map(layouts2.lg, (res, i) => {
      const [h, form, response] = res.sourceItem;
      const itemStyles = {
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
      return (
        <div key={i} className={`grid-item`} style={itemStyles} draggable={true}>
          {/* <div>
            <span>
              <div>
                <Link href={`/form/users/response/${response?.createdBy?.count}`}>
                  <a>
                    <u>
                      {response.createdBy.values[1].value}
                      {response.createdBy.values[2].value}
                    </u>
                  </a>
                </Link>
                <br />
                <span>{`${moment(response.createdAt).format('l')} ${moment(
                  response.createdAt,
                ).format('LT')}`}</span>
              </div>
            </span>
          </div> */}
          {/* <p>HEHE</p> */}

          {/* {form?.fields
            ?.filter((field) => field.label === 'Webpage')
            .map((filteredField, i) => (
              <div key={i}>
                <FieldValuesMap field={filteredField} response={response} />
              </div>
            ))} */}
          {/* <p>{response.values[0].value}</p> */}
          <MyHTMLComponent htmlContent={response.values[0].value} />
        </div>
      );
    });
  };

  return (
    <div
      style={{
        border: '5px solid #ddd',
        height: '100%',
        width: '100%',
        marginBottom: '20px',
        borderRadius: '5px',
      }}
    >
      <div
        style={{
          border: '5px solid #ddd',
          borderRadius: '5px',
          marginBottom: '20px',
          display: 'flex',
          height: '100%',
          width: '100%',
        }}
      >
        <div
          style={{
            border: '5px solid #ddd',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          <ResponseList form={formData} />
        </div>
        <div
          style={{
            border: '5px solid #ddd',
            borderRadius: '5px',
            marginBottom: '20px',
            borderColor: 'black',
            height: '100%',
            width: '100%',
          }}
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

export default DragFromOutsideLayout;
