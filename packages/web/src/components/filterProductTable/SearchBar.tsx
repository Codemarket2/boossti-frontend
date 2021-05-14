import React from 'react';

interface IProps {
  onFilterTextChange: (value: string) => void;
  onInStockChange: (value: string) => void;
  filterText: string;
  inStockOnly: boolean;
}

export default function SearchBar({
  onFilterTextChange,
  onInStockChange,
  filterText,
  inStockOnly,
}: IProps) {
  const handleInStockChange = (e) => {
    onInStockChange(e.target.checked);
  };
  const handleFilterTextChange = (e) => {
    onFilterTextChange(e.target.value);
  };
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={handleFilterTextChange}
      />
      <p>
        <input type="checkbox" checked={inStockOnly} onChange={handleInStockChange} /> Only show
        products in stock
      </p>
    </form>
  );
}
