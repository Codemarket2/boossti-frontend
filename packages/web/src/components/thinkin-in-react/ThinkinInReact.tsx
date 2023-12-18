import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ResponsiveGridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const WidthResponsiveGridLayout = WidthProvider(ResponsiveGridLayout);

const layout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
  { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
];

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <WidthResponsiveGridLayout
      className="layout"
      layout={layout}
      cols={12}
      autoSize="true"
      rowHeight={30}
      width={1200}
      allowOverlap={false}
    >
      <div key="1" style={{ backgroundColor: '#65cfe0' }}>
        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={setFilterText}
          onInStockOnlyChange={setInStockOnly}
        />
      </div>
      <div key="2" style={{ backgroundColor: '#659fe0' }}>
        <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
      </div>
    </WidthResponsiveGridLayout>
  );
}

FilterableProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      stocked: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

ProductCategoryRow.propTypes = {
  category: PropTypes.string.isRequired,
};

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

ProductRow.propTypes = {
  product: PropTypes.shape({
    stocked: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      stocked: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filterText: PropTypes.string.isRequired,
  inStockOnly: PropTypes.bool.isRequired,
};

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form>
      <label htmlFor="filterTextInput">
        Search:
        <input
          type="text"
          id="filterTextInput"
          value={filterText}
          placeholder="Search..."
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
      </label>
      <label htmlFor="filterTextInput">
        <input
          type="checkbox"
          id="inStockOnlyInput"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{' '}
        Only show products in stock
      </label>
    </form>
  );
}

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  inStockOnly: PropTypes.bool.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  onInStockOnlyChange: PropTypes.func.isRequired,
};

const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

export default function ThinkingR() {
  return <FilterableProductTable products={PRODUCTS} />;
}
