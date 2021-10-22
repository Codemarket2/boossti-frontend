import React, { useState, useEffect } from 'react';
import {
  GET_FIELDS_BY_TYPE,
  GET_FIELD_VALUES_BY_FIELD,
} from '@frontend/shared/graphql/query/field';
import { guestQuery } from './guestQuery';
import ErrorLoading from '../../components/common/ErrorLoading';
import FieldsSkeleton from '../../components/field/FieldsSkeleton';
import FieldValueCard from '../../components/field/FieldValueCard';

function ItemOneFields({ parentId, field }) {
  const [payload, setPayload] = useState(null);
  const [isPublish, setIsPublish] = useState(true);
  useEffect(() => {
    guestQuery(GET_FIELD_VALUES_BY_FIELD, { parentId, field: field._id }, setPayload);
  }, []);

  if (!payload?.data || !payload?.data?.getFieldValuesByItem) {
    return <FieldsSkeleton />;
  }
  return (
    <div key={field._id}>
      {payload?.data?.getFieldValuesByItem?.data?.map((fieldValue, index) => (
        <FieldValueCard
          field={field}
          fieldValue={fieldValue}
          isPublish={isPublish}
          key={fieldValue._id}
        />
      ))}
    </div>
  );
}

interface IProps {
  parentId: string;
  typeId: string;
}
export default function DisplayContentBuilder({ parentId, typeId }: IProps) {
  const [payload, setPayload] = useState(null);
  useEffect(() => {
    guestQuery(GET_FIELDS_BY_TYPE, { parentId: typeId }, setPayload);
  }, []);

  if (!payload?.data || !payload?.data?.getFieldsByType) {
    return <FieldsSkeleton />;
  }
  return (
    <>
      {payload?.data?.getFieldsByType?.data?.map((field, index) => (
        <div key={field._id}>
          <ItemOneFields parentId={parentId} field={field} />
        </div>
      ))}
    </>
  );
}
