import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

export interface IProducts {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface IProps {
  products: IProducts[];
}

interface IState {
  inStockOnly: boolean;
  filterText: string;
}

export default function FilterProductTable({ products }: IProps) {
  const [state, setState] = useState<IState>({ filterText: '', inStockOnly: false });

  const handleFilterTextChange = (filterText) => {
    setState({
      ...state,
      filterText,
    });
  };

  const handleInStockChange = (inStockOnly) => {
    setState({
      ...state,
      inStockOnly,
    });
  };

  return (
    <div>
      <SearchBar
        filterText={state.filterText}
        inStockOnly={state.inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
      />
      <ProductTable
        products={products}
        filterText={state.filterText}
        inStockOnly={state.inStockOnly}
      />
    </div>
  );
}
