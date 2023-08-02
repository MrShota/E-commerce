const btnCart = document.getElementById('btnCart');
getCategoriesFromServer();
getProductsFromServer(12, 0);


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

function getProductsFromServer(limit, skip) {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then(res => res.json())
        .then(allProduct => {
            renderProducts(allProduct.products);
            paging(allProduct.total, allProduct.limit);
        });
}
function renderProducts(products) {
    for (let product of products) {
        const productElement = document.createElement('div');
        const productTitle = document.createElement('div');
        const productImg = document.createElement('img');
        const productDescription = document.createElement('div');
        const productPrice = document.createElement('div');
        const addBtn = document.createElement('button');

        productElement.classList.add('product-element');
        productImg.classList.add('product-img');
        productTitle.classList.add('product-title');
        productPrice.classList.add('product-price');
        productDescription.classList.add('product-description');
        addBtn.classList.add('add-btn');

        productTitle.innerText = product.title;
        productImg.src = product.images[0]
        productDescription.innerText = product.description;
        productPrice.innerText = '$ ' + product.price
        addBtn.innerText = 'Add to Cart'

        addBtn.addEventListener('click', () => {
            addProductToCart(productTitle.innerText, productPrice.innerText)
        })
        productElement.append(productImg, productTitle, productPrice, productDescription, addBtn);
        mainContent.append(productElement)
    }
}
function paging(totalCount, limit) {
    const mainContent = document.getElementById('main-content');
    const paging = document.createElement('div');
    paging.classList.add('paging')
    for (let i = 0; i < totalCount / limit; i++) {
        
        const pagingElement = document.createElement('div');
        pagingElement.classList.add('pagingElement');
        const pageIndex = i + 1;
        pagingElement.innerText = pageIndex;
        paging.append(pagingElement);
        mainContent.append(paging);


        pagingElement.addEventListener('click', () => {
            handlePage(pageIndex, limit)

        })
    }
}

function handlePage(pageIndex, limit) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerText = '';
    const skip = (pageIndex - 1) * limit
    getProductsFromServer(limit, skip)
}

btnCart.addEventListener('click', () => {
    const cartContent = document.createElement('div');
    singleProduct.classList.add('single-product');
    cartContent.append(singleProduct)
    
    cartContent.classList.add('cart-content')
    // alert('works')
});
const singleProduct = document.createElement('div')

function addProductToCart(title, price) {
    const cartProductName = document.createElement('div');
    const cartProductPrice = document.createElement('div');
    const cartProductDelete = document.createElement('button');

    cartProductName.innerText = title;
    cartProductPrice.innerText = price;
    cartProductDelete.innerText = 'X';

    cartProductName.classList.add('cart-name');
    cartProductPrice.classList.add('cart-price');
    cartProductDelete.classList.add('btn-delete');

    singleProduct.append(cartProductName, cartProductPrice, cartProductDelete)
    // cartContent.append(cartProduct)


}
