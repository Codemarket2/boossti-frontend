import React from 'react';
import { IProducts } from './FilterProductTable';

interface IProps {
  product: IProducts;
}

export default function ProductRow({ product }: IProps) {
  return (
    <tr>
      <td>
        {product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>}
      </td>
      <td>{product.price}</td>
    </tr>
  );
}
