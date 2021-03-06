'use strict';

// получаем продукты с их свойствами
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


// получаем фильтры с отмеченными параметрами
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
    let sortedProductsId = [];

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

        // и тд ...
        if (indicator === true) {
            indicator = verifyStrength(filters.strength, product);
        }

        // и тд ...
        if (indicator === true) {
            indicator = verifyFlexibility(filters.flexibility, product);
        }

        // если продукт подожел под все фильтры добавляем его ID в массив
        if (indicator === true) {
            sortedProductsId.push(product.id);
        }

    });


    // проверяем фильтр - цвет
    function verifyColor(color, product) {
        let status = false;                             // по умолчанию продукт не попадает под фильтр
        status = (color.length === 0) ? true : false;   // если ни один пункт фильтра не выделен, то продукт попадает под фильтрацию
        color.forEach(function (item) {                 // перебираем все пункты фильтра
            if (item === product.color) {               // сравниваем со значением соответствующего свойства продукта
                status = true;                          // если св-во продукта = одному из отмеченных пунктов фильтра, то он попадает под фильтр
            }

            // проверяем на наличие разделителя "|" (если может быть несколько значений у одного товара)
            if (product.color.includes('|')) {
                let arrParametrs = product.color.split('|');				// собираем возможные значения
                for (let k = 0; k < arrParametrs.length; k++) {				// перебираем их
                    if (arrParametrs[k] === String(item)) {					// сравниваем со значением соответствующего свойства продукта
                        status = true;
                        break;
                    }
                }
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

            if (product.size.includes('|')) {
                let arrParametrs = product.size.split('|');
                for (let k = 0; k < arrParametrs.length; k++) {
                    if (arrParametrs[k] === String(item)) {
                        status = true;
                        break;
                    }
                }
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

            if (product.direction.includes('|')) {
                let arrParametrs = product.direction.split('|');
                for (let k = 0; k < arrParametrs.length; k++) {
                    if (arrParametrs[k] === String(item)) {
                        status = true;
                        break;
                    }
                }
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

            if (product.massa.includes('|')) {
                let arrParametrs = product.massa.split('|');
                for (let k = 0; k < arrParametrs.length; k++) {
                    if (arrParametrs[k] === String(item)) {
                        status = true;
                        break;
                    }
                }
            }
        });
        return status;
    }

    // проверяем фильтр - прочность
    function verifyStrength(strength, product) {
        let status = false;
        status = (strength.length === 0) ? true : false;
        strength.forEach(function (item) {
            if (item === product.strength) {
                status = true;
            }

            if (product.strength.includes('|')) {
                let arrParametrs = product.strength.split('|');
                for (let k = 0; k < arrParametrs.length; k++) {
                    if (arrParametrs[k] === String(item)) {
                        status = true;
                        break;
                    }
                }
            }
        });
        return status;
    }

    // проверяем фильтр - гибкость
    function verifyFlexibility(flexibility, product) {
        let status = false;
        status = (flexibility.length === 0) ? true : false;
        flexibility.forEach(function (item) {
            if (item === product.flexibility) {
                status = true;
            }

            if (product.flexibility.includes('|')) {
                let arrParametrs = product.flexibility.split('|');
                for (let k = 0; k < arrParametrs.length; k++) {
                    if (arrParametrs[k] === String(item)) {
                        status = true;
                        break;
                    }
                }
            }
        });
        return status;
    }

    return sortedProductsId;        // возвращаем ID всех товаров прошедших проверку
}


// перерисовка вывода продуктов после фильтрации
function executeRedrawProducts(sortedProductsId) {
    const ELEMENTS = Array.from(document.querySelector('#products').querySelectorAll('.product'));

    ELEMENTS.forEach(function (product) {
        product.classList.add('hide');
        let id = product.querySelector('.id').getAttribute('data-id');
        executeVerifyId(id, product)
    });

    function executeVerifyId(id, product) {
        sortedProductsId.forEach(function (sortedId) {
            if (sortedId == id) {
                product.classList.remove('hide');
            }
        });
    }
}


(function () {
    const BUTTON_FILTER = document.querySelector('#filterButton');
    const BUTTON_CLEAR = document.querySelector('#clearButton');

    BUTTON_FILTER.addEventListener('click', onFilterButtonClick);
    BUTTON_CLEAR.addEventListener('click', onClearButtonClick);

    function onFilterButtonClick() {
        let products = getProducts();
        let filters = getFiltres();
        let sortedProductsId = executeFiltering(filters, products);
        executeRedrawProducts(sortedProductsId);
    }

    function onClearButtonClick() {
        let products = Array.from(document.querySelector('#products').querySelectorAll('.product'));
        let characteristics = Array.from(document.querySelector('#filters').querySelectorAll('.characteristic'));

        products.forEach(function (product) {
            if (product.classList.contains('hide')) {
                product.classList.remove('hide');
            }
        });

        characteristics.forEach(function (characteristic) {
            if (characteristic.checked === true) {
                characteristic.checked = false;
            }
            if (characteristic.selected === true) {
                characteristic.selected = false;
            }
        });
    }
})(); 
