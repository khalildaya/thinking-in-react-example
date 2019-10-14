import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterableProductTable from '../FilterableProductTable';
import each from 'jest-each';
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
        expect(filterTextInput.value).toEqual("");

        // Check that checkbox exists in search bar and expect it to be unchecked
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

test('Non-stocked items disapear when checkbox is checked', () => {
    const products = [
        {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
        {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
        {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
        {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
        {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
        {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
      ];

    const {
        getByLabelText,
        getByText,
    } = render(<FilterableProductTable data={products}/>);

    /*
        Make sure that checkbox is not checked after component renders
        then send a click event to the checkox to filter out non-stocked items
    */
    const filterCheckboxInput = getByLabelText("Only show products in stock");
    expect(filterCheckboxInput.checked).toBeFalsy();
    fireEvent.click(filterCheckboxInput);
    expect(filterCheckboxInput.checked).toBeTruthy();

    // Expect to find all stocked items and no non-stocked items
    products.forEach(product => {
        if (product.stocked) {
            getByText(product.name);
            getByText(product.price);
        } else {
            console.log(product.name);
            expect(() => {
                getByText(product.name);
            }).toThrow();
        }
    });
});

/*
    A paramterized test to cover the following cases
    1. No filter text
    2. filter text that results in some non-stocked products whcih should not be displayed due to filter chekbox begin checked
    3. Filter text that results in no products to display regardless of checkbox state 
*/
each(["","ball", "noitems"]).test('Product list does filter based on filter text and stocked only checkbox state', (filterText) => {
    const products = [
        {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
        {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
        {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
        {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
        {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
        {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
      ];

    const {
        getByLabelText,
        getByText,
        getByPlaceholderText,
    } = render(<FilterableProductTable data={products}/>);

    /*
        Make sure that checkbox is not checked after component renders
        then send a click event to the checkox to filter out non-stocked items
    */
   const filterCheckboxInput = getByLabelText("Only show products in stock");
   expect(filterCheckboxInput.checked).toBeFalsy();
   fireEvent.click(filterCheckboxInput);
   expect(filterCheckboxInput.checked).toBeTruthy();
    
    const filterTextInput = getByPlaceholderText("Search...");
    expect(filterTextInput.nodeValue).toBeNull();
    fireEvent.change(filterTextInput, {
        target: {
            value: filterText,
        },
    });
    expect(filterTextInput.value).toEqual(filterText);
    // Expect to find all products with the string "ball" in their name except non-stocked ones
    products.forEach(product => {
        if(product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            expect(() => {
                getByText(product.name);
            }).toThrow();
        } else if(!product.stocked) {
            expect(() => {
                getByText(product.name);
            }).toThrow();
        } else {
            getByText(product.name);
        }
    });
});