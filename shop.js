function addToCartClicked() {
    let buttonClicked = event.target;
    let itemAdded = buttonClicked.parentElement.parentElement;
    console.log(itemAdded);
    let itemAddedTitle = itemAdded.getElementsByClassName('shop-item-image')[0].title;
    let itemAddedImage = itemAdded.getElementsByClassName('shop-item-image')[0].src;
    let itemAddedPrice = buttonClicked.value;
    let x = checkCartContents(itemAddedTitle);
    if (x == true) {
        updateCartQuantity(itemAddedTitle);
        doTheMath();
    } 
    else {
        AddToCart(itemAddedImage, itemAddedPrice, itemAddedTitle);
        doTheMath();        
        // console.log(total);
    }
}

function AddToCart(image, price, title) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartContents = document.getElementsByClassName('cart-contents')[0];
    let cartRowContents = `
            <img class="cart-item-img" src="${image}" alt="">
            <span class="cart-item-title">${title}</span>
            <input class="cart-item-quantity" title="${title}" type="number" value="1" min="1">
            <span class="cart-item-price">${price}</span>
            <div class="button-del" id="delete-button" ><i class="fa-solid fa-xmark"></i></div>            
        `;
    
    cartRow.innerHTML = cartRowContents;
    let deleteButton = cartRow.getElementsByClassName('button-del')[0];
    deleteButton.addEventListener('click', delShopItem);
    let quantity = cartRow.getElementsByClassName('cart-item-quantity')[0].addEventListener('change', doTheMath);
    cartContents.append(cartRow);    
    console.log(deleteButton);
    
}

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

function updateCartQuantity(itemAdded) {
    let cartContents = document.getElementsByClassName('cart-contents')[0];
    let itemToUpdate = cartContents.getElementsByClassName('cart-item-quantity');
    for (let x = 0; x < itemToUpdate.length; x++) {   
        if (itemToUpdate[x].title == itemAdded) {
            itemToUpdate[x].value++;
        }
    }
}

function delShopItem() {
    let buttonClicked = event.target;
    buttonClicked.parentNode.remove();
    doTheMath();
}

function doTheMath() {
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
    }
    total = total.toFixed(2);
    document.getElementsByClassName('cart-total-display')[0].innerText = "\$ " + total;
    // console.log(cartRows);
}

function showCart() {
    let el = document.getElementById("cart-section");
    el.style.display = "block";
}