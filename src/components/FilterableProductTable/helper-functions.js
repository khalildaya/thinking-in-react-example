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

function filterData(filterText, showOnlyInStock, data) {
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

export {
    filterData,
    transformData
}