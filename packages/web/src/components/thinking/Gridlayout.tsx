/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
// Gridlayout.tsx

import React, { useState } from 'react';
import { PropTypes } from '@material-ui/core';
import { WidthProvider, Responsive } from 'react-grid-layout';
import styles from './style.module.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function GridLayout() {
  const PRODUCTS = [
    { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
    { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
    { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
    { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
    { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
    { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
  ];

  // eslint-disable-next-line react/prop-types
  function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    //   return (
    //     <div>
    //       <SearchBar
    //         filterText={filterText}
    //         inStockOnly={inStockOnly}
    //         onFilterTextChange={setFilterText}
    //         onInStockOnlyChange={setInStockOnly} />
    //       <ProductTable
    //         products={products}
    //         filterText={filterText}
    //         inStockOnly={inStockOnly} />
    //     </div>
    //   );
    // }

    return (
      <div>
        <ResponsiveReactGridLayout
          className="styles.layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          <div key="searchBar">
            <SearchBar
              filterText={filterText}
              inStockOnly={inStockOnly}
              onFilterTextChange={setFilterText}
              onInStockOnlyChange={setInStockOnly}
            />
          </div>
          {/* <div key="productTable">
        <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
      </div> */}

          {/* Add the other components here */}
        </ResponsiveReactGridLayout>
        <div>
          <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
        </div>
      </div>
    );
  }

  function ProductCategoryRow({ category }) {
    return (
      <ResponsiveReactGridLayout className="styles.productCategoryRow">
        <div key="productCategoryRow">
          <tr>
            <th colSpan={2}>{category}</th>
          </tr>
        </div>
      </ResponsiveReactGridLayout>
    );
  }

  // ProductCategoryRow.propTypes = {
  //   category: PropTypes.string.isRequired
  // }

  function ProductRow({ product }) {
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: 'red' }}>{product.name}</span>
    );

    return (
      <ResponsiveReactGridLayout className="styles.productRow">
        <div key="productRow">
          <tr>
            <td>{name}</td>
            <td>{product.price}</td>
          </tr>
        </div>
      </ResponsiveReactGridLayout>
    );
  }

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

  function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
    return (
      <form>
        <input
          type="text"
          value={filterText}
          placeholder="Search..."
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
          />{' '}
          Only show products in stock
        </label>
      </form>
    );
  }

  return <FilterableProductTable products={PRODUCTS} />;
}

export default GridLayout;
