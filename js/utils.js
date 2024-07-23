export const savetoLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};
export const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
};
export const updateCartIcon = (cart) =>{
  const cartIcon = document.getElementById("cart-icon")
  const i = document.querySelector(".bx-shopping-bag");
  let totalQuantity = cart.reduce((sum, item)=>sum + item.quantity ,0)
  i.setAttribute("data-quantity",totalQuantity)
}
