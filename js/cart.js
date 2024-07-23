import {
  calculateCartTotal,
  getCartFromLocalStorage,
  savetoLocalStorage,
  updateCartIcon,
} from "./utils.js";

export let cart = getCartFromLocalStorage();

export const addToCart = (event, products) => {
  const productID = parseInt(event.target.dataset.id);
  const product = products.find((product) => productID === product.id);

  if (product) {
    const existingItem = cart.find((item) => item.id === productID);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      console.log("ürün sepete ilk defa ekleniyor");
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    savetoLocalStorage(cart);

    event.target.textContent = "Added";
    const takeItBack = () => {
      event.target.textContent = "Add to cart";
    };
    setTimeout(takeItBack, 500);
    updateCartIcon(cart);
    displayCartTotal();
    
  }
};
export const renderCartItems = () => {
  const cartItemsElement = document.getElementById("cartItems");
  cartItemsElement.innerHTML = cart
    .map(
      (item) =>
        `<div class="cart-item">
                        <img width="100px"
                            src="${item.image}"
                            alt="cart">
                        <div class="cart-item-info">
                            <h2 class="cart-item-title">${item.title}</h2>
                            <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity"
                            data-id="${item.id}"
                            />
                        </div>
                        <h2>$${item.price}</h2>
                        <button class="remove-from-cart" data-id="${item.id}" >remove</button>
                    </div>`
    )
    .join("");

  const removeButtons = document.getElementsByClassName("remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }
  const quantityInputs = document.getElementsByClassName("cart-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", changeQuantity);
  }
};
const removeFromCart = (e) => {
  const productID = Number(e.target.dataset.id);

  cart = cart.filter((item) => item.id !== productID);

  savetoLocalStorage(cart);
  renderCartItems();
  displayCartTotal();
  updateCartIcon(cart);
};
const changeQuantity = (e) => {
  const productID = Number(e.target.dataset.id);
  const quantity = Number(e.target.value);
  if (quantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);
    if (cartItem) {
      cartItem.quantity = quantity;
      savetoLocalStorage(cart);
      displayCartTotal()
      updateCartIcon(cart)
    }
  }
};
export const displayCartTotal = () => {
  const cartTotalElement = document.querySelector("#cartTotal");
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
};
