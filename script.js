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


(function () {
    const BUTTON = document.querySelector('#filterButton');
    const BUTTON = document.querySelector('#filterResult');

    let filters = {};
    let products = {};

    BUTTON.addEventListener('click', onFilterButtonClick);

    function onFilterButtonClick() {
        filters = getProducts();
        products = getFiltres();

        console.log(filters);
        console.log(products);
    }
})(); 
