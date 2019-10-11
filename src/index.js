import React from 'react';
import ReactDOM from 'react-dom';
import FilterableProductTable from './FilterableProductTable';

const data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

function transformData(data) {
    const tempResult = {};
    const result = [];

    data.forEach(element => {
        if (!tempResult[element.category]) {
            tempResult[element.category] = {
                category: element.category,
                items: [{
                    price: element.price,
                    stocked: element.stocked,
                    name: element.name,
                }]
            };
        } else {
            tempResult[element.category].items.push({
                price: element.price,
                stocked: element.stocked,
                name: element.name,
            });
        }
    });
    const categoryNames = Object.getOwnPropertyNames(tempResult);
    categoryNames.forEach(categoryName => {
        result.push(tempResult[categoryName]);
    });
    return result;
}
ReactDOM.render(
    <FilterableProductTable data={transformData(data)}/>,
    document.getElementById("root")
);