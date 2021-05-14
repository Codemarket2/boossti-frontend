import React from 'react';

interface IProps {
  onFilterTextChange: (value: string) => void;
  onInStockChange: (value: string) => void;
  filterText: string;
  inStockOnly: boolean;
}

class SearchBar extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />{' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

export default SearchBar;
