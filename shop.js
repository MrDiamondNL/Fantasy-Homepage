function addToCartClicked() {
    let buttonClicked = event.target;
    let itemAdded = buttonClicked.parentElement;
    let itemAddedTitle = itemAdded.getElementsByClassName('shop-item-image')[0].title;
    let itemAddedImage = itemAdded.getElementsByClassName('shop-item-image')[0].src;
    let itemAddedPrice = buttonClicked.value;

    AddToCart(itemAddedImage, itemAddedPrice, itemAddedTitle);
    console.log(itemAddedPrice);
    // document.getElementById('cart-section').innerHTML;
}

function AddToCart(image, price, title) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartContents = document.getElementsByClassName('cart-contents')[0];
    let cartRowContents = `
        <div class="cart-row">
            <img class="cart-item-img" src="${image}" alt="">
            <span class="cart-item-title">${title}</span>
            <input class="cart-item-quantity" type="number" value="1">
            <button class="button-del" id="delete-button" type="button" onclick="">X</button>
            <span class="cart-item-price">${price}</span>
        </div>
        `;
    cartRow.innerHTML = cartRowContents;
    console.log(cartContents);
    cartContents.append(cartRow);
}

