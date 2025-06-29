import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = '';

products.forEach(product => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select class="js-product-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button"
            data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function addToCart(productId, button) {
    let matchingItem;
    cart.forEach(item => {
        if (item.productId === productId) {
            matchingItem = item;
        }
    });

    const quantitySelector = document.querySelector(`.js-product-quantity-selector-${button.dataset.productId}`);
    const quantity = Number(quantitySelector.value);

    if (matchingItem) {
        matchingItem.quantity = quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity
        });
    }
}

const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId, button);

        let cartQuantity = 0;

        cart.forEach(item => {
            cartQuantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

        addedMessage.classList.add('added-to-cart-visible');

        // Clear any existing timeout before setting a new one
        if (addedMessage.timeoutId) {
            clearTimeout(addedMessage.timeoutId);
        }

        addedMessage.timeoutId = setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
            addedMessage.timeoutId = null;
        }, 2000);

        console.log(cart);
    });
});