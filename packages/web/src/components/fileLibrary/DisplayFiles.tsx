import Card from '@mui/material/Card';
import React from 'react';
import { getFileName } from '@frontend/shared/utils/fileUpload';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  urls: string[];
  onDelete?: (url: string) => void;
}

export default function DisplayFiles({ urls, onDelete }: IProps) {
  return (
    <div>
      {urls?.map((url) => (
        <div className="p-1 mt-2 d-flex align-items-center">
          {url?.includes('/image-') ? (
            <div style={{ width: '100px' }}>
              <img className="w-100" src={url} alt={getFileName(url)} />
            </div>
          ) : (
            <Card variant="outlined" className="p-1">
              <a href={url} target="_blank" rel="noreferrer">
                {getFileName(url)}
              </a>
            </Card>
          )}
          {onDelete && (
            <div>
              <Tooltip title="Delete">
                <IconButton size="small" color="error" edge="end" onClick={() => onDelete(url)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
