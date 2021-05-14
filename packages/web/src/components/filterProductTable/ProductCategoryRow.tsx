import React from 'react';

interface IProps {
  category: string;
}

export default function ProductCategoryRow({ category }: IProps) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}
