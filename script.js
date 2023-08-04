const mainContent = document.getElementById('mainContent')
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

function addItemToCart(title, price) {
    const cartBox = document.createElement('div')
    const cartBoxTitle = document.createElement('div')
    const cartBoxPrice = document.createElement('div')
    const cartBoxDelete = document.createElement('div')

    cartBox.classList.add('cart-box')
    cartBoxTitle.classList.add('cart-box-title')
    cartBoxPrice.classList.add('cart-box-price')
    cartBoxDelete.classList.add('cart-box-delete')


    cartBoxTitle.innerText = title;
    cartBoxPrice.innerText = price;
    cartBoxDelete.innerText = 'X'
    const itemInCart = document.getElementById('itemInCart')
    
    cartBoxDelete.addEventListener('click', () => {
        cartBox.remove();
        cartBoxFooterText.innerText = '';
        itemInCart.innerText--;

    })



    cartBox.append(cartBoxTitle, cartBoxPrice, cartBoxDelete)
    const cart = document.getElementById('cart');
    cart.prepend(cartBox)
    
    itemInCart.innerText = cart.children.length-1;

    calculateTotalPrice(cartBoxPrice, price)
}
function calculateTotalPrice(cartBoxPrice, price) {
    const cartBoxFooterText = document.getElementById('cartBoxFooterText');

//    ------------------- needs repair 
    if (cart.children.length === 2) {
        cartBoxFooterText.innerText = price;

        // console.log(cart.children.length)
    }
    else if (cart.children.length > 2) {
        // const all = cart.children;
        // console.log(all)
        // for (let one in all) {
        //      console.log(all)
        // }

        const total = cartBoxPrice.innerText;
        console.log(total + price)
    }


}

const btnCart = document.getElementById('btnCart');
btnCart.addEventListener('mouseenter', () => {
    const cart = document.getElementById('cart');
    cart.style.display = 'block'
})
btnCart.addEventListener('mouseleave', () => {
    const cart = document.getElementById('cart');
    cart.style.display = 'none'
})
const cart = document.getElementById('cart');
cart.addEventListener('mouseenter', () => {
    const cart = document.getElementById('cart');
    cart.style.display = 'block'
})
cart.addEventListener('mouseleave', () => {
    const cart = document.getElementById('cart');
    cart.style.display = 'none'
})