import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowRight from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

export default function DisplayDiff({
  objectKey,
  value,
  initial,
  level,
}: {
  value: any;
  objectKey?: string;
  initial?: boolean;
  level: number;
}) {
  const [expand, setExpand] = useState(false);
  if (objectKey === 'updatedAt') {
    return null;
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return (
        <>
          {objectKey && (
            <Typography fontWeight="bold" className="mt-1">
              {objectKey}
              <IconButton size="small" edge="end" onClick={() => setExpand(!expand)}>
                {expand ? <ArrowDropDown /> : <ArrowRight />}
              </IconButton>
            </Typography>
          )}
          {expand && (
            <div className="ml-3">
              {value?.map((v, i) => (
                <DisplayDiff key={i} value={v} level={level + 1} objectKey={`${i + 1})`} />
              ))}
            </div>
          )}
        </>
      );
    }
    return (
      <>
        {objectKey && (
          <Typography fontWeight="bold" className="mt-1">
            {objectKey}
            <IconButton size="small" edge="end" onClick={() => setExpand(!expand)}>
              {expand ? <ArrowDropDown /> : <ArrowRight />}
            </IconButton>
          </Typography>
        )}
        {expand && (
          <div className={initial ? '' : 'ml-3'}>
            {Object.keys(value || {})?.map((key, index) => (
              <DisplayDiff objectKey={key} value={value[key]} key={index} level={level + 1} />
            ))}
          </div>
        )}
      </>
    );
  }
  if (['string', 'number', 'boolean'].includes(typeof value)) {
    return (
      <div className="mt-1">
        <Typography>
          <b>{objectKey}</b> - {typeof value === 'string' ? value || '""' : `${value}`}
        </Typography>
      </div>
    );
  }
  return <Typography>{objectKey} - NA</Typography>;
}
