const mainContent = document.getElementById('mainContent');
const btnSearch = document.getElementById('btnSearch');
getProductsFromServer(12, 0);

(function getCategoriesFromServer() {
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(allCategory => {
            renderCategories(allCategory)
        });
}())
function renderCategories(categories) {
    const categoryList = document.getElementById('categories-list');
    for (let category of categories) {
        const categoryElement = document.createElement('div');
        categoryElement.innerText = category;
        categoryElement.classList.add('category-element');
        const line = document.createElement('div');
        line.classList.add('line');
        categoryList.append(categoryElement, line);
        categoryElement.addEventListener('click', () => {
            getProductsByCategory(category)
        })
    }
}
function getProductsByCategory(category) {

    fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(productsByCategory => {
            renderProductByCategory(productsByCategory.products)
        });
}
function renderProductByCategory(productByCategory) {
    mainContent.innerHTML = '';
    for (let products of productByCategory) {
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

        productTitle.innerText = products.title;
        productImg.src = products.images[0];
        productDescription.innerText = products.description;
        productPrice.innerText = '$ ' + products.price;
        addBtn.innerText = 'Add to Cart';

        addBtn.addEventListener('click', () => {
            addItemToCart(productTitle.innerText, productPrice.innerText);
        })

        productElement.append(productImg, productTitle, productPrice, productDescription, addBtn);
        mainContent.append(productElement)
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
        const productPriceCurrency = document.createElement('div');
        const productPriceText = document.createElement('div');

        const addBtn = document.createElement('button');

        productElement.classList.add('product-element');
        productImg.classList.add('product-img');
        productTitle.classList.add('product-title');
        productPrice.classList.add('product-price');
        productPriceText.classList.add('product-price-text');

        productDescription.classList.add('product-description');
        addBtn.classList.add('add-btn');

        productTitle.innerText = product.title;
        productImg.src = product.images[0];
        productDescription.innerText = product.description;
        productPriceCurrency.innerText = '$';
        productPriceText.innerText = product.price;

        productPrice.prepend(productPriceCurrency, productPriceText)

        addBtn.innerText = 'Add to Cart'

        addBtn.addEventListener('click', () => {
            addItemToCart(product, product.title, product.price);
        })
        productElement.append(productImg, productTitle, productPrice, productDescription, addBtn);
        mainContent.append(productElement)
    }

}

function paging(totalCount, limit) {
    // const containerWrapper = document.getElementById('containerWrapper');
    const paging = document.createElement('div');
    paging.classList.add('paging')

    for (let i = 0; i < totalCount / limit; i++) {
        const pagingElement = document.createElement('div');
        pagingElement.classList.add('pagingElement');
        const pageIndex = i + 1;
        pagingElement.innerText = pageIndex;

        pagingElement.addEventListener('click', () => {
            handlePage(pageIndex, limit);
            // pagingElement.style.color='red'
        })
        paging.append(pagingElement);
    }

    mainContent.append(paging);
}

function handlePage(pageIndex, limit) {

    // const mainContent = document.getElementById('mainContent');
    mainContent.innerText = '';
    const skip = (pageIndex - 1) * limit
    getProductsFromServer(limit, skip)
}

function addItemToCart(product, title, price) {

    const cartContainer = document.createElement('div');
    const item = document.createElement('div');
    const itemImg = document.createElement('img');
    const itemTitle = document.createElement('div');

    const itemCount = document.createElement('div');
    const itemCountMinus = document.createElement('div');
    const itemCountText = document.createElement('div');
    const itemCountPlus = document.createElement('div');
    itemCount.append(itemCountMinus, itemCountText, itemCountPlus);

    const itemPrice = document.createElement('div');
    const itemDelete = document.createElement('img');
    const itemLine = document.createElement('div');
    item.append(itemImg, itemTitle, itemCount, itemPrice, itemDelete, itemLine);


    const itemTotal = document.createElement('div');
    const itemTotalText = document.createElement('div');
    const itemTotalCount = document.createElement('div');
    const itemTotalText2 = document.createElement('div');
    const itemTotalCurrency = document.createElement('div');
    const itemTotalPrice = document.createElement('div');
    const itemTotalBtn = document.createElement('button');
    itemTotal.append(itemTotalText, itemTotalCount, itemTotalText2, itemTotalCurrency, itemTotalPrice, itemTotalBtn);

    //class name's
    cartContainer.classList.add('cart-container');
    item.classList.add('item');
    itemImg.classList.add('item-img');
    itemTitle.classList.add('item-title');
    itemPrice.classList.add('item-price');
    itemDelete.classList.add('item-delete');
    itemTotal.classList.add('item-total');
    itemCount.classList.add('item-count');
    itemCountMinus.classList.add('item-count-minus');
    itemCountText.classList.add('item-count-text');
    itemCountPlus.classList.add('item-count-plus');

    // assign values
    // itemImg.innerText = product.images[0];
    itemTitle.innerText = title;
    itemPrice.innerText = price;
    itemDelete.src = '/delete.png';
    itemCountMinus.innerText ='-';
    itemCountText.innerText ='0';
    itemCountPlus.innerText= `+`;



    cartContainer.append(item, itemTotal);



    assign(cartContainer)

}

function assign(cartContainer) {
    const container = document.getElementById('container');
    const containerWrapper=document.getElementById('containerWrapper')
    containerWrapper.remove();
    container.insertBefore(cartContainer, container.children[1]);
}


btnSearch.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    // console.log(searchInput);
    renderSearchProduct(searchInput);

})

function renderSearchProduct(input) {
    mainContent.innerText = '';

    fetch(`https://dummyjson.com/products/search?q=${input}`)
        .then(res => res.json())
        .then(data => {
            const searchElement = data.products;
            // console.log(searchElement.length)

            if (searchElement.length > 1) {
                console.log(data)
                for (let products of searchElement) {
                    mainContent.style.color = 'black';

                    // console.log(productByCategory)
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

                    productTitle.innerText = products.title;
                    productImg.src = products.images[0];
                    productDescription.innerText = products.description;
                    productPrice.innerText = '$ ' + products.price;
                    addBtn.innerText = 'Add to Cart';

                    addBtn.addEventListener('click', () => {
                        addItemToCart(productTitle.innerText, productPrice.innerText);
                    })

                    productElement.append(productImg, productTitle, productPrice, productDescription, addBtn);
                    mainContent.append(productElement)
                }
            } else {
                const errorContainer = document.createElement('div');
                errorContainer.classList.add('error-container');

                const errorImg = document.createElement('img');
                errorImg.classList.add('error-img');
                errorImg.src = 'not-found.png';

                const errorText = document.createElement('span');
                errorText.classList.add('error-text');
                errorText.innerText = 'Product not found!';

                errorContainer.append(errorText, errorImg);
                mainContent.append(errorContainer);
            }

        });
}
const imgLogo = document.getElementById('imgLogo');
imgLogo.addEventListener('click', () => {
    getProductsFromServer(12, 0);

})
const imgLogo2 = document.getElementById('imgLogo2');
imgLogo2.addEventListener('click', () => {
    getProductsFromServer(12, 0);

})

const btnCart = document.getElementById('btnCart');
btnCart.addEventListener('click', () => {
    renderCart();
})

function renderCart() {
    if (cart.children.length == 0) {
        console.log('empty')
    } else {
        console.log('error');
        //remove content, add cart
        assign();


    }

}


