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
    const FILTER_RESULTS = document.querySelector("#filterResult");

    FILTER_BUTTON.addEventListener('click', onFilterButtonClick);

    function onFilterButtonClick() {
        let goods = getGoods();                                 // получим список товаров с их параметрами
        let filteringOption = getFilters();                     // получим отмеченные фильтры
        let result = performFiltering(goods, filteringOption);  // выполним и получим результаты фильтрации

        if (result.length === 0) {
            FILTER_RESULTS.innerHTML = 'Ничего не найдено. Повторите фильтрацию с другими параметрами.';
        } else {
            FILTER_RESULTS.innerHTML = result;
        }
    }

    function performFiltering(goods, filteringOption) {
        let filteredProducts = [];

        goods.forEach(function (item) {                          // берем товар (перебираем)
            for (let propertyGoods in item) {                    // берем название его свойства (перебираем)
                if (propertyGoods !== 'id') {                    // название "id" не проверяем

                    for (let prorertyFilters in filteringOption) {      // берем название фильтра (перебираем)
                        if (prorertyFilters === propertyGoods) {        // если название фильтра совпадает с названием свойства товара

                            for (let valueProperty of filteringOption[prorertyFilters]) {       // берем значение свойства фильтра (перебираем)
                                if (valueProperty === item[propertyGoods]) {                    // если значение свойства фильтра = значениию свойства товара

                                    if (!filteredProducts.includes(item.id)) {                  // товар проходит фильтрацию, добавляем его id, если   
                                        filteredProducts.push(item.id);                         // его еще нет в списке
                                        break;
                                    }

                                }
                            }

                        }
                    }

                }
            }
        });

        return filteredProducts;
    }
})();