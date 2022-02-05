'use strict';

const basketCountSpan = document.querySelector('.cartIconWrap span');
const basketTotalSpanValue = document.querySelector('.basketTotalValue');
const basketContents = document.querySelector('.basketRow');
const basketTotalEl = document.querySelector('.basketTotal');
const basketDiv = document.querySelector('.basket');

const basket = {};

//Обработчик клика по корзине
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketDiv.classList.toggle('hidden');
})

//Обработчик клика по кнопке add to cart
document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCartButton')) {
        return;
    }
    const productItem = event.target.closest('.featuredItem');
    const dataItemId = productItem.dataset.id;
    const dataItemName = productItem.dataset.name;
    const dataItemPrice = productItem.dataset.price;
    addItemToBasket(dataItemId, dataItemName, dataItemPrice);
})

function addItemToBasket(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    basketCountSpan.textContent = +getProdCountInBasket();
    basketTotalSpanValue.textContent = getTotalPriceInBasket().toFixed(2);
    renderBasketEls(id);
}

function renderBasketEls(id) {
    const basketDivRowEl = basketDiv
        .querySelector(`.basketRow[data-id="${id}"]`);
    if (!basketDivRowEl) {
        addElemToBasketDiv(id);
        return;
    }
    basketDivRowEl.querySelector('.productCount').textContent =
        basket[id].count;
    basketDivRowEl.querySelector('.productTotalRow').
        textContent = (basket[id].count * basket[id].price);
}


function addElemToBasketDiv(productId) {
    const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price *
            basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

//Функция для подсчета общей цены товара в корзине.
function getTotalPriceInBasket() {
    let totalPrice = 0
    for (let prod in basket) {
        totalPrice += (basket[prod].price * basket[prod].count);
    }
    return totalPrice;
}

//Функция для подсчета общего кол-ва товара в корзине.
function getProdCountInBasket() {
    let totalCount = 0
    for (let prod in basket) {
        totalCount += basket[prod].count;
    }
    return totalCount;

}