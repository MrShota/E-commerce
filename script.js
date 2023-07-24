const categoryList = document.getElementById('categories-list');
const mainContent = document.getElementById('main-content')

fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(allCategory => {
        for (let category of allCategory) {
            const categoryElement = document.createElement('div');
            categoryElement.innerText = category;
            categoryElement.classList.add('category-element');
            const line = document.createElement('div');
            line.classList.add('line');
            // toUpperCase(categoryElement)
            categoryList.append(categoryElement, line);
        }
    });
fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(allProduct => {
        renderAllProduct(allProduct.products)
    });
function renderAllProduct(products) {
    console.log(products)
    for (let product of products) {
        const productElement = document.createElement('div');
        const productTitle = document.createElement('div');
        const productImg = document.createElement('img');
        const productDescription = document.createElement('div');
        const productPrice = document.createElement('div');

        productElement.classList.add('product-element');
        productElement.classList.add('product-title');
        productElement.classList.add('product-img');
        productElement.classList.add('product-description');
        productElement.classList.add('product-price');

        productTitle.innerText = product.title;
        productImg.innerText = product.images[0]
        productDescription.innerText = product.description;
        productPrice.innerText = '$ ' + product.price


        productElement.append(productImg, productTitle, productDescription, productPrice);
        mainContent.append(productElement)
    }
}