const mainContent = document.getElementById('mainContent')
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
            addItemToCart(productTitle.innerText, productPrice.innerText)
        })

        productElement.append(productImg, productTitle, productPrice, productDescription, addBtn);
        mainContent.append(productElement)
    }
}
function paging(totalCount, limit) {
    const mainContent = document.getElementById('mainContent');
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
    const mainContent = document.getElementById('mainContent');
    mainContent.innerText = '';
    const skip = (pageIndex - 1) * limit
    getProductsFromServer(limit, skip)
}

function renderCartBox() {
    const cartBox = document.getElementById(cartBox);
    const cartBoxTitle = document.getElementById(cartBoxTitle);
    const cartBoxPrice = document.getElementById(cartBoxPrice);
    const cartBoxDelete = document.getElementById(cartBoxDelete);
    const cartBoxFooter = document.getElementById(cartBoxFooter);
    const cartBoxFooterText = document.getElementById(cartBoxFooterText);
    const cartBoxFooterTotal = document.getElementById(cartBoxFooterTotal);
    const cartBoxFooterBtn = document.getElementById(cartBoxFooterBtn)


    cartBoxTitle.innerText = title;
    cartBoxPrice.innerText = price;
    cartBoxFooterTotal.innerText = price;
    cartBoxDelete.innerText = 'X'
    cartBoxFooterText.innerText = 'Total:';
    cartBoxFooterBtn.innerText = 'Pay now'

}
