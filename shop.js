//This function checks to see if the item is already in the cart, and either Adds it or increases the quantity
function addToCartClicked() {
    let buttonClicked = event.target;
    let itemAdded = buttonClicked.parentElement.parentElement;
    let itemAddedTitle = itemAdded.getElementsByClassName('shop-item-image')[0].title;
    let itemAddedImage = itemAdded.getElementsByClassName('shop-item-image')[0].src;
    let itemAddedPrice = buttonClicked.value;
    let x = checkCartContents(itemAddedTitle);
    if (x == true) {
        document.getElementById("initial-nothing").style.display = "none";
        updateCartQuantity(itemAddedTitle);
        doTheMath();
    } 
    else {
        document.getElementById("initial-nothing").style.display = "none";
        AddToCart(itemAddedImage, itemAddedPrice, itemAddedTitle);
        doTheMath();        
    }
}

//This function Adds the item to the list of cart items
function AddToCart(image, price, title) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartContents = document.getElementsByClassName('cart-contents')[0];
    let cartRowContents = `
            <img class="cart-item-img" src="${image}" alt="">
            <span class="cart-item-title">${title}</span>
            <input class="cart-item-quantity" title="${title}" type="number" value="1" min="1">
            <span class="cart-item-price">${price}</span>
            <i class="fa-solid fa-xmark button-del" onclick="delShopItem(event)"></i>            
        `;
    
    cartRow.innerHTML = cartRowContents;
    let quantity = cartRow.getElementsByClassName('cart-item-quantity')[0].addEventListener('change', doTheMath);
    cartContents.append(cartRow);
    
}

//this function returns whether the item to add is in the cart or not
function checkCartContents(itemAdded) {
    let cartContents = document.getElementsByClassName('cart-contents')[0];
    let itemTitle = cartContents.getElementsByClassName('cart-item-title');
    let isThere = false;
    for (let x = 0; x < itemTitle.length; x++) {   
        if (itemTitle[x].innerText == itemAdded) {
            isThere = true;
        }
    }
    return isThere;
}

//This function updates quantity of the item already in the cart
function updateCartQuantity(itemAdded) {
    let cartContents = document.getElementsByClassName('cart-contents')[0];
    let itemToUpdate = cartContents.getElementsByClassName('cart-item-quantity');
    for (let x = 0; x < itemToUpdate.length; x++) {   
        if (itemToUpdate[x].title == itemAdded) {
            itemToUpdate[x].value++;
        }
    }
}

//this function removes the entire line item from the cart
function delShopItem(event) {
    event.stopPropagation();
    let buttonClicked = event.target;
    buttonClicked.parentNode.remove();
    doTheMath();
}

//This function updates the total of the cart contents whenever it is changed
function doTheMath() {
    let cartCount = 0;
    let total = 0;
    let itemPrice = 0;
    let itemAmount = 0;
    let totalToAdd = 0;
    let cartContents = document.getElementsByClassName('cart-contents')[0];
    let cartRows = cartContents.getElementsByClassName('cart-row');
    for (let x = 0; x < cartRows.length; x++) {
        let currentRow = cartRows[x];
        itemPrice = currentRow.getElementsByClassName('cart-item-price')[0].innerText;
        itemAmount = currentRow.getElementsByClassName('cart-item-quantity')[0].value;
        totalToAdd = itemPrice * itemAmount;
        total = total + totalToAdd;
        cartCount = Number(cartCount) + Number(itemAmount);
    }
    total = total.toFixed(2);
    document.getElementsByClassName('cart-total-display')[0].innerText = " $" + total;
    document.getElementById("cart-count-number").innerText = cartCount;
}

//this function either shows or hides the cart depending on display value
function toggleCart() {
    let el = document.getElementById("cart-section");
    el.style.display = (el.style.display != "block") ? "block":"none";
}

