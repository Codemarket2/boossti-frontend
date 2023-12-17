import React, { useState } from 'react';
// import ResponsiveGridLayout, { WidthProvider, Responsive } from 'react-grid-layout';

import PropTypes from 'prop-types';
import ResponsiveGridLayout from 'react-grid-layout';

const layout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
  { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
];

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = React.useState('');
  const [inStockOnly, setInStockOnly] = React.useState(false);

  return (
    // <ResponsiveGridLayout
    //   className="layout"
    //   layout={layout}
    //   cols={12}
    //   rowHeight={30}
    //   width={1200}
    //   isDraggable={true}
    //   allowOverlap={true}
    // >
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />

      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
    // </ResponsiveGridLayout>
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
    // <ResponsiveGridLayout
    //   className="layout"
    //   layout={layout}
    //   cols={12}
    //   rowHeight={30}
    //   width={1200}
    //   isDraggable={true}
    //   allowOverlap={true}
    // >
    <div key="b" style={{ backgroundColor: 'red' }}>
      <tr>
        <th colSpan={2}>{category}</th>
      </tr>
    </div>
    // </ResponsiveGridLayout>
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
    // <ResponsiveGridLayout
    //   className="layout"
    //   layout={layout}
    //   cols={12}
    //   rowHeight={30}
    //   width={1200}
    //   isDraggable={true}
    //   allowOverlap={true}
    // >
    // <div key="b" style={{ backgroundColor: 'white' }}>
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
    // </div>
    // // </ResponsiveGridLayout>
  );
}

ProductRow.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    stocked: PropTypes.bool.isRequired,
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
    <ResponsiveGridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      isDraggable
      allowOverlap
    >
      <div key="b" style={{ backgroundColor: 'white' }}>
        <table>
          <thead>
            <tr>
              <th>Name &nbsp; &nbsp; &nbsp;</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </ResponsiveGridLayout>
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
    <ResponsiveGridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      isDraggable
      allowOverlap
    >
      <div key="b" style={{ backgroundColor: 'blue' }}>
        <form>
          <input
            type="text"
            value={filterText}
            placeholder="Search..."
            onChange={(e) => onFilterTextChange(e.target.value)}
          />
          <label htmlFor="filterTextInput">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockOnlyChange(e.target.checked)}
            />{' '}
            Only show products in stock
          </label>
        </form>
      </div>
    </ResponsiveGridLayout>
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

export default function Thinking() {
  return <FilterableProductTable products={PRODUCTS} />;
}

// const initialState = {
//   layouts: {},
//   styles: {},
//   selectedField: null,
//   selectedElement: null,
//   layoutEdit: true,
//   editMode: false,
// };

// const layout = [
//   { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
//   { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
//   { i: 'c', x: 4, y: 0, w: 1, h: 2 },
// ];

// function FilterableProductTable({ products }) {
//   const [filterText, setFilterText] = useState('');
//   const [inStockOnly, setInStockOnly] = useState(false);

//   return (
//     // <>
//     //   <ResponsiveGridLayout
//     //     className="layout"
//     //     layout={layout}
//     //     cols={12}
//     //     rowHeight={30}
//     //     width={1200}
//     //   >
//     //     <div key="b" style={{ backgroundColor: 'violet' }}>
//     //       <SearchBar
//     //         filterText={filterText}
//     //         inStockOnly={inStockOnly}
//     //         onFilterTextChange={setFilterText}
//     //         onInStockOnlyChange={setInStockOnly}
//     //       />
//     //       <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
//     //     </div>
//     //   </ResponsiveGridLayout>
//     // </>
//     <div>
//       <SearchBar
//         filterText={filterText}
//         inStockOnly={inStockOnly}
//         onFilterTextChange={setFilterText}
//         onInStockOnlyChange={setInStockOnly}
//       />
//       <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
//     </div>
//   );
// }

// function ProductCategoryRow({ category }) {
//   return (
//     <>
//       <ResponsiveGridLayout
//         className="layout"
//         layout={layout}
//         cols={12}
//         rowHeight={30}
//         width={1200}
//       >
//         <div key="b" style={{ backgroundColor: 'red' }}>
//           <tr>
//             <th colSpan={2}>{category}</th>
//           </tr>
//         </div>
//       </ResponsiveGridLayout>
//     </>
//   );
// }

// function ProductRow({ product }) {
//   const name = product.stocked ? (
//     product.name
//   ) : (
//     <span style={{ color: 'red' }}>{product.name}</span>
//   );

//   return (
//     <>
//       <ResponsiveGridLayout
//         className="layout"
//         layout={layout}
//         cols={12}
//         rowHeight={30}
//         width={1200}
//       >
//         <div key="b" style={{ backgroundColor: 'white' }}>
//           <tr>
//             <td>{name}</td>
//             <td>{product.price}</td>
//           </tr>
//         </div>
//       </ResponsiveGridLayout>
//     </>
//   );
// }

// function ProductTable({ products, filterText, inStockOnly }) {
//   const rows = [];
//   let lastCategory = null;

//   products.forEach((product) => {
//     if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
//       return;
//     }
//     if (inStockOnly && !product.stocked) {
//       return;
//     }
//     if (product.category !== lastCategory) {
//       rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
//     }
//     rows.push(<ProductRow product={product} key={product.name} />);
//     lastCategory = product.category;
//   });

//   return (
//     // <>
//     //   <ResponsiveGridLayout
//     //     className="layout"
//     //     layout={layout}
//     //     cols={12}
//     //     rowHeight={30}
//     //     width={1200}
//     //   >
//     //     <div key="b" style={{ backgroundColor: 'violet' }}>
//     //       <table>
//     //         <thead>
//     //           <tr>
//     //             <th>Name</th>
//     //             <th>Price</th>
//     //           </tr>
//     //         </thead>
//     //         <tbody>{rows}</tbody>
//     //       </table>
//     //     </div>
//     //   </ResponsiveGridLayout>
//     // </>
//     <table>
//       <thead>
//         <tr>
//           <th>Name &nbsp; &nbsp; &nbsp;</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>{rows}</tbody>
//     </table>
//   );
// }

// function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
//   return (
//     <>
//       <ResponsiveGridLayout
//         className="layout"
//         layout={layout}
//         cols={12}
//         rowHeight={30}
//         width={1200}
//       >
//         <div key="b" style={{ backgroundColor: 'blue' }}>
//           <form>
//             <input
//               type="text"
//               value={filterText}
//               placeholder="Search..."
//               onChange={(e) => onFilterTextChange(e.target.value)}
//             />
//             <label>
//               <input
//                 type="checkbox"
//                 checked={inStockOnly}
//                 onChange={(e) => onInStockOnlyChange(e.target.checked)}
//               />{' '}
//               Only show products in stock
//             </label>
//           </form>
//         </div>
//       </ResponsiveGridLayout>
//     </>
//   );
// }

// const PRODUCTS = [
//   { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
//   { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
//   { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
//   { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
//   { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
//   { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
// ];

// export default function Thinking() {
//   return <FilterableProductTable products={PRODUCTS} />;
// }
