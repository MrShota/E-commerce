getCategoriesFromServer();
getProductsFromServer(12);

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

function getProductsFromServer(limit) {
    fetch(`https://dummyjson.com/products?limit=${limit}`)
        .then(res => res.json())
        .then(allProduct => {
            renderProducts(allProduct.products);
            paging(allProduct.total, allProduct.limit);
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
function paging(totalCount, limit) {
    const mainContent = document.getElementById('main-content')
    const paging = document.createElement('div');
    paging.classList.add('paging')
    for (let i = 0; i < totalCount / limit; i++) {
        const pagingElement = document.createElement('div');
        pagingElement.classList.add('pagingElement')
        pagingElement.innerText = i + 1;
        paging.append(pagingElement)
        mainContent.append(paging);

    }



}