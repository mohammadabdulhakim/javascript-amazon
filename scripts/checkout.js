import { cart } from "../data/cart.js";

updateCheckoutQuantity()
function updateCheckoutQuantity(){
    const checkoutHeaderLink = document.querySelector(".checkout-header-middle-section .return-to-home-link");
    
    let cartQuantity = 0; 
    
    cart.map((product)=>{
      cartQuantity += product.quantity
    })
    
    checkoutHeaderLink.innerHTML = cartQuantity !== 0 ? (cartQuantity + " item" + (cartQuantity > 1? "s":"")):"No items";
  }