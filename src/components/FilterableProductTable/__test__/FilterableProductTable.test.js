import React from 'react';
import { render } from '@testing-library/react';
import FilterableProductTable from '../FilterableProductTable';
import { exportAllDeclaration } from '@babel/types';

function extractProductCategories(data) {
    const categories = {};
    data.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = product.category;
        }
    });
    return Object.getOwnPropertyNames(categories);
}
test('Component renders fine', () => {
    const products = [
        {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
        {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
        {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
        {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
        {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
        {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
      ];

      const {
          getByPlaceholderText,
          getByLabelText,
          getByText,
        } = render(<FilterableProductTable data={products}/>);

        // Check that all component have rendered
        // Check text input in search bar and expect it to be null
        const filterTextInput = getByPlaceholderText("Search...");
        expect(filterTextInput.nodeValue).toBeNull();

        // Check checkbox in search bar and expect it to be unchecked
        const filterCheckboxInput = getByLabelText("Only show products in stock");
        expect(filterCheckboxInput.checked).toBeFalsy();
        
        // Check for ProductTable component
        getByText("Name");
        getByText("Price");

        // Check that all product categories are present;
        const categories = extractProductCategories(products);
        categories.forEach(category => {
            getByText(category);
        });

        // Ceck that all products are displayed
        products.forEach(product => {
            getByText(product.name);
            getByText(product.price);
        })
});