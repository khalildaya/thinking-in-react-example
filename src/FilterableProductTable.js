import React from 'react';


function SearchBar(props) {
    return (
        <div>
            <div>
                <input type="text" placeholder="Search..." onChange={props.onFilterTextChange}></input>
            </div>
            <div>
                <input id="showOnlyInStock" type="checkbox"></input>
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
        this.state = {
            filteredData: this.props.data,
            showOnlyInStock: false,
            filterText: '',
        };
        this.originalData = this.props.data;
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    handleFilterTextChange(event) {
        const filterText = event.target.value;
        this.setState({
            filteredData: this.filterData(filterText, this.originalData)
        });
    }

    filterData(filterText, data) {
        if (filterText === null || filterText === undefined || filterText.trim() === '') {
            return this.originalData;
        }
        const result = [];
        data.forEach(products => {
            const filteredProducts = [];
            products.items.forEach(product => {
                if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
                    filteredProducts.push(product);
                }
            });
            if (filteredProducts.length > 0) {
                result.push({
                    category: products.category,
                    items: filteredProducts,
                })
            }
        });
        return result;
    }
    render() {
        return (
            <div>
                <SearchBar onFilterTextChange={this.handleFilterTextChange}/>
                <ProductTable data={this.state.filteredData}/>
            </div>
        );
    }
}

export default FilterableProductTable