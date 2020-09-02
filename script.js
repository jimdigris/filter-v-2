'use strict';

function getProducts() {
    const ELEMENTS = Array.from(document.querySelector('#products').querySelectorAll('.product'));
    let products = [];

    ELEMENTS.forEach(function (element) {
        let product = {
            id: element.querySelector('.id').getAttribute('data-id'),
            color: element.querySelector('.color').getAttribute('data-color'),
            size: element.querySelector('.size').getAttribute('data-size'),
            direction: element.querySelector('.direction').getAttribute('data-direction'),
            massa: element.querySelector('.massa').getAttribute('data-massa'),
            strength: element.querySelector('.strength').getAttribute('data-strength'),
            flexibility: element.querySelector('.flexibility').getAttribute('data-flexibility'),
        };
        products.push(product);
    });

    return products;
}


function getFiltres() {
    const ELEMENTS = document.querySelector('#filters');

    let filters = {
        color: getFilterCharacteristic('color'),
        size: getFilterCharacteristic('size'),
        direction: getFilterCharacteristic('direction'),
        massa: getFilterCharacteristic('massa'),
        strength: getFilterCharacteristic('strength'),
        flexibility: getFilterCharacteristic('flexibility')
    };

    function getFilterCharacteristic(filterName) {
        let characteristics = [];
        let elements = Array.from(ELEMENTS.querySelector(`.filter-${filterName}`).querySelectorAll('.characteristic'));

        elements.forEach(function (element) {
            if (element.checked || element.selected) {
                characteristics.push(element.getAttribute(`data-${filterName}`));
            }
        });

        return characteristics;
    }

    return filters;
}


// фильтрация
function executeFiltering(filters, products) {
    let sortedProducts = [];

    // перебираем продукты
    products.forEach(function (product) {
        let indicator = false;                              // по умолчанию продукт не попадает под фильтр

        indicator = verifyColor(filters.color, product);    // запускаем проверку по первому фильтру

        // если проверку прошло, запускаем проверку по сл фильтру
        if (indicator === true) {
            indicator = verifySize(filters.size, product);
        }

        // и тд ...
        if (indicator === true) {
            indicator = verifyDirection(filters.direction, product);
        }

        // и тд ...
        if (indicator === true) {
            indicator = verifyMassa(filters.massa, product);
        }

        console.log(indicator);
    });


    // проверяем фильтр - цвет
    function verifyColor(color, product) {
        let status = false;                             // по умолчанию продукт не попадает под фильтр
        status = (color.length === 0) ? true : false;   // если ни один пункт фильтра не выделен, то продукт попадает под фильтрацию
        color.forEach(function (item) {                 // перебираем все пункты фильтра
            if (item === product.color) {               // сравниваем со значением соответствующего свойства продукта
                status = true;                          // если св-во продукта = одному из отмеченных пунктов фильтра, то он попадает под фильтр
            }
        });
        return status;                                  // возвращаем статус проверки, подходит ли продукт по фильтру или нет
    }

    // проверяем фильтр - размер
    function verifySize(size, product) {
        let status = false;
        status = (size.length === 0) ? true : false;
        size.forEach(function (item) {
            if (item === product.size) {
                status = true;
            }
        });
        return status;
    }

    // проверяем фильтр - направление
    function verifyDirection(direction, product) {
        let status = false;
        status = (direction.length === 0) ? true : false;
        direction.forEach(function (item) {
            if (item === product.direction) {
                status = true;
            }
        });
        return status;
    }

    // проверяем фильтр - масса
    function verifyMassa(massa, product) {
        let status = false;
        status = (massa.length === 0) ? true : false;
        massa.forEach(function (item) {
            if (item === product.massa) {
                status = true;
            }
        });
        return status;
    }


    return sortedProducts;
}


(function () {
    const BUTTON = document.querySelector('#filterButton');
    const RESULT = document.querySelector('#filterResult');

    let filters = {};
    let products = [];
    let sortedProducts = [];

    BUTTON.addEventListener('click', onFilterButtonClick);

    function onFilterButtonClick() {
        products = getProducts();
        filters = getFiltres();

        console.log(filters);
        console.log(products);

        sortedProducts = executeFiltering(filters, products);

        //console.log(sortedProducts);
    }
})(); 
