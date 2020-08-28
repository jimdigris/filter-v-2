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

    console.log(products);
    return products;
}

function getFiltres() {
    const ELEMENTS = document.querySelector('#filters');
    let filters = {
        id: getFilterCharacteristic('id'),
        color: '',
        size: '',
        direction: '',
        massa: '',
        strength: '',
        flexibility: ''
    };

    function getFilterCharacteristic(filterName) {
        let characteristics = [];
        //let elements = ELEMENTS.querySelectorAll(filterName);


        return characteristics;
    }



    console.log(ELEMENTS);
    return filters;
}


getProducts();
getFiltres();