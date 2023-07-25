getCategoriesFromServer();
getProductsFromServer();

function getCategoriesFromServer() {
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(allCategory => {
            renderCategories(allCategory)
        });
}
function renderCategories(categories) {
    const categoryList = document.getElementById('categories-list');
    for (let category of categories) {
        const categoryElement = document.createElement('div');
        categoryElement.innerText = category;
        categoryElement.classList.add('category-element');
        const line = document.createElement('div');
        line.classList.add('line');
        // toUpperCase(categoryElement)
        categoryList.append(categoryElement, line);
    }
}

function getProductsFromServer() {
    fetch('https://dummyjson.com/products?limit=28')
        .then(res => res.json())
        .then(allProduct => {
            renderProducts(allProduct.products)
        });
}
function renderProducts(products) {
    const mainContent = document.getElementById('main-content')
    for (let product of products) {
        const productElement = document.createElement('div');
        const productTitle = document.createElement('div');
        const productImg = document.createElement('img');
        const productDescription = document.createElement('div');
        const productPrice = document.createElement('div');

        productElement.classList.add('product-element');
        productImg.classList.add('product-img');
        productTitle.classList.add('product-title');
        productPrice.classList.add('product-price');
        productDescription.classList.add('product-description');

        productTitle.innerText = product.title;
        productImg.src = product.images[0]
        productDescription.innerText = product.description;
        productPrice.innerText = '$ ' + product.price


        productElement.append(productImg, productTitle, productPrice, productDescription);
        mainContent.append(productElement)
    }
}