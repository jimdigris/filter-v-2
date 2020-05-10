'use strict';

// --- фильтры ---
function getFilters() {
    const FILTERS = Array.from(document.querySelector('#filters').querySelectorAll('.filter'));
    let parameters = {};

    // получим все возможные варианты фильтрации
    FILTERS.forEach(function (item) {
        let elements = item.querySelectorAll('.parameter-value');
        let values = [];

        for (let i = 0; i < elements.length; i++) {
            // оставим только выбранные
            if (elements[i].checked || elements[i].selected) {
                values.push(elements[i].value);
            }
        }

        parameters[item.getAttribute('data-parameter')] = values;
    });

    // готовый список выбраных параметров для фильтрации
    return parameters;
};

// --- товары ---
function getGoods() {
    const GOODS = Array.from(document.querySelector('#goods').querySelectorAll('.product'));
    let products = [];

    // получим товары с их параметрами
    GOODS.forEach(function (item) {
        let product = {
            id: item.getAttribute('data-id'),
            color: item.getAttribute('data-parameter-color'),
            size: item.getAttribute('data-parameter-size'),
            direction: item.getAttribute('data-parameter-direction'),
            mass: item.getAttribute('data-parameter-mass'),
            strength: item.getAttribute('data-parameter-strength'),
            flexibility: item.getAttribute('data-parameter-flexibility')
        };

        products.push(product);
    });

    // готовый список товаров с параметрами для фильтрации
    return products;
};


// --- фильтрация ---
(function () {
    const FILTER_BUTTON = document.querySelector('#filterButton');

    FILTER_BUTTON.addEventListener('click', onFilterButtonClick);

    function onFilterButtonClick() {
        console.log(getFilters());
        console.log(getGoods());
    }
})();