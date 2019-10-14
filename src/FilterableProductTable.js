import React from 'react';


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
        this.state = {
            filteredData: this.props.data,
            showOnlyInStock: false,
            filterText: '',
        };
        this.originalData = this.props.data;
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleShowOnlyStockedChange = this.handleShowOnlyStockedChange.bind(this);
    }
    handleFilterTextChange(event) {
        const filterText = event.target.value;
        this.setState({
            filteredData: this.filterData(filterText, this.state.showOnlyInStock, this.originalData),
            filterText,
        });
    }

    handleShowOnlyStockedChange(event) {
        const showOnlyInStock = event.target.checked;
        console.log("show", showOnlyInStock);
        this.setState({
            filteredData: this.filterData(this.state.filterText, showOnlyInStock, this.originalData),
            showOnlyInStock,
        });
    }

    filterData(filterText, showOnlyInStock, data) {
        // In case there is no filtered text, filtr list based on whether show products in stock only flag is checked or not
        if (filterText === null || filterText === undefined || filterText.trim() === '') {
            if (!showOnlyInStock) {
                return data;
            }
            const result = [];
            data.forEach(products => {
                const filteredProducts = [];
                products.items.forEach(product => {
                    if (product.stocked) {
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
        const result = [];
        data.forEach(products => {
            const filteredProducts = [];
            products.items.forEach(product => {
                if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
                    if (showOnlyInStock) {
                        if (product.stocked) {
                            filteredProducts.push(product);
                        }
                    } else {
                        filteredProducts.push(product);
                    }
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
                <SearchBar onFilterTextChange={this.handleFilterTextChange} onShowOnlyStockChange={this.handleShowOnlyStockedChange}/>
                <ProductTable data={this.state.filteredData}/>
            </div>
        );
    }
}

export default FilterableProductTable