import React from 'react';
import {
    filterData,
    transformData
} from './helper-functions.js'

function SearchBar(props) {
    return (
        <div>
            <div>
                <input type="text" placeholder="Search..." onChange={props.onFilterTextChange}></input>
            </div>
            <div>
                <input id="showOnlyInStock" type="checkbox" onChange={props.onShowOnlyStockChange}></input>
                <label htmlFor="showOnlyInStock">Only show products in stock</label>
            </div>
        </div>
    );
}

function ProductCategoryRow(props) {
    return (
        <tr>
            <th colSpan="2">{props.category}</th>
        </tr>
    );
}

function ProductRow(props) {
    const name = props.product.stocked ? props.product.name : <span style={{color: 'red'}}>{props.product.name}</span>
    return (
        <tr>
            <td>{name}</td>
            <td>{props.product.price}</td>
        </tr>
    );
}
function ProductTable(props) {
    function renderRows(data) {
        const rows = [];
        data.forEach(products => {
            rows.push(<ProductCategoryRow key={products.category} category={products.category} />);
            products.items.forEach(product => {
                rows.push(<ProductRow key={product.name} product={product} />)
            });
        });
        return rows;
    };
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {renderRows(props.data)}
            </tbody>
        </table>
    );
}
class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.originalData = transformData(this.props.data);
        this.state = {
            filteredData: this.originalData,
            showOnlyInStock: false,
            filterText: '',
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleShowOnlyStockedChange = this.handleShowOnlyStockedChange.bind(this);
    }
    handleFilterTextChange(event) {
        const filterText = event.target.value;
        this.setState({
            filteredData: filterData(filterText, this.state.showOnlyInStock, this.originalData),
            filterText,
        });
    }

    handleShowOnlyStockedChange(event) {
        const showOnlyInStock = event.target.checked;
        this.setState({
            filteredData: filterData(this.state.filterText, showOnlyInStock, this.originalData),
            showOnlyInStock,
        });
    }

    render() {
        return (
            <div>
                <SearchBar onFilterTextChange={this.handleFilterTextChange} onShowOnlyStockChange={this.handleShowOnlyStockedChange}/>
                <ProductTable data={this.state.filteredData}/>
            </div>
        );
    }
}


export default FilterableProductTable