// localStorage.js

export const getCartItemsFromLocalStorage = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  };
  
  export const saveCartItemsToLocalStorage = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
  