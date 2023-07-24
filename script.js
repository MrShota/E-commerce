const categoryList = document.getElementById('categories-list');

fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(allCategory => {
        for (let category of allCategory) {
            const categoryElement = document.createElement('div');
            categoryElement.innerText = category;
            categoryElement.classList.add('category-element');
            const line = document.createElement('div');
            line.classList.add('line');
            toUpperCase(categoryElement)
            categoryList.append(categoryElement, line);

        }
    });