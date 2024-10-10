import { cart, updateCart } from "../data/cart.js";
import { currencyFormat } from "./utils.js";
import { products } from "/data/products.js";


function updateCheckoutQuantity() {
  const checkoutHeaderLink = document.querySelector(
    ".checkout-header-middle-section .return-to-home-link"
  );

  let cartQuantity = 0;

  cart.map((product) => {
    cartQuantity += product.quantity;
  });

  checkoutHeaderLink.innerHTML =
    cartQuantity !== 0
      ? cartQuantity + " item" + (cartQuantity > 1 ? "s" : "")
      : "No items";
}

function previewCartItems(){
  const orderSummary = document.querySelector(".checkout-grid .order-summary");
  let orderSummaryInnerHTML = "";
  cart.forEach((item) => {
    const oneProduct = products.find((product) => product.id === item.productId);
    orderSummaryInnerHTML += `
    <div class="cart-item-container cart-product-id-${oneProduct.id}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src=${oneProduct.image}>
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${oneProduct.name}
                  </div>
                  <div class="product-price">
                    $${currencyFormat(oneProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${
                        item.quantity
                      }</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary" data-id=${oneProduct.id}>
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${oneProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${oneProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${oneProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `;
  });
  
  orderSummary.innerHTML = orderSummaryInnerHTML;
  prepareDeleteButtons()
  updateCheckoutQuantity()
}
previewCartItems()

function prepareDeleteButtons(){
  const deleteButtons = document.querySelectorAll(".delete-quantity-link")
  deleteButtons.forEach((button)=>{
    button.addEventListener("click",(e)=>{
      const updatedCart = cart.filter((item)=>{
        return item.productId !== e.target.dataset.id
      })

      updateCart(updatedCart)
      
      const itemToRemove = document.querySelector(`.cart-product-id-${button.dataset.id}`)
      itemToRemove.remove();
    })
  })
}