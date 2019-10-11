import React from 'react';


function SearchBar() {
    return (
        <div>
            <div>
                <input type="text" placeholder="Search..."></input>
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
            products.items.map(product => {
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
            originalData: this.props.data,
            filteredData: this.props.data,
            showOnlyInStock: false,
            filterText: '',
        };
    }
    render() {
        return (
            <div>
                <SearchBar />
                <ProductTable data={this.state.filteredData}/>
            </div>
        );
    }
}

export default FilterableProductTable