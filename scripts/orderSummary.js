import { cart, getCartQuantity, updateCart } from "../data/cart.js";
import { currencyFormat } from "./utils/money.js";
import { products } from "/data/products.js";
import {renderPaymentSummary} from "./paymentSummary.js";

import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";


export const renderOrderSummary = () =>{
    function updateCheckoutQuantity() {
      const checkoutHeaderLink = document.querySelector(
        ".checkout-header-middle-section .return-to-home-link"
      );
    
      const cartQuantity = getCartQuantity();
    
      checkoutHeaderLink.innerHTML =
        cartQuantity !== 0
          ? cartQuantity + " item" + (cartQuantity > 1 ? "s" : "")
          : "No items";
    }
    
    const nextNDays = (n) => dayjs().add(n,"days").format("dddd, MMMM | D-MM");
    
    function previewCartItems(){
      const orderSummary = document.querySelector(".checkout-grid .order-summary");
      let orderSummaryInnerHTML = "";
      cart.forEach((item) => {
        const oneProduct = products.find((product) => product.id === item.productId);
        orderSummaryInnerHTML += `
        <div class="cart-item-container cart-product-id-${oneProduct.id}">
                  <div class="delivery-date delivery-date-${oneProduct.id}">
                    Delivery date: 
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
                      <div class="product-quantity product-quantity-${oneProduct.id}">
                        <span>
                          Quantity: <span class="quantity-label quantity-label-${oneProduct.id}">${
                            item.quantity
                          }</span>
                        </span>
                        <span class="update-quantity-link link-primary" data-item-id=${oneProduct.id}>
                          Update
                        </span>
                        <div class="input-quantity-container">
                          <input min="1" value=${item.quantity} class="update-input update-input-${oneProduct.id}" type="number" />
                          <div class="link-primary save-quantity" data-item-id=${oneProduct.id}>
                            Save
                          </div>
                        </div>
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
                        <input type="radio" 
                          class="delivery-option-input"
                          name="delivery-option-${oneProduct.id}"
                          id="delivery-option-${oneProduct.id}"
                          value="9"
                          >
                        <div>
                          <div class="delivery-option-date">
                            ${nextNDays(9)}
                          </div>
                          <div class="delivery-option-price">
                            FREE Shipping
                          </div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          name="delivery-option-${oneProduct.id}"
                          id="delivery-option-${oneProduct.id}"
                          value="5"
                          >
                        <div>
                          <div class="delivery-option-date">
                            ${nextNDays(5)}
                          </div>
                          <div class="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          name="delivery-option-${oneProduct.id}"
                          id="delivery-option-${oneProduct.id}"
                          value="1"
                          >
                        <div>
                          <div class="delivery-option-date">
                            ${nextNDays(1)}
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
          renderPaymentSummary();
        })
      })
    }
    
    document.querySelectorAll(".update-quantity-link").forEach(btn=>{
      btn.addEventListener("click", e =>{
        document.querySelector(".product-quantity-"+ btn.dataset.itemId).classList.add("is-updating-quantity")
      })
    })
    
    document.querySelectorAll(".link-primary.save-quantity").forEach(btn=>{
      btn.addEventListener("click", e =>{
        handleSaveNewQuantity(btn.dataset.itemId)
      })
    })
    document.addEventListener("keyup",(e)=>{
      if(e.key === "Enter" && e.target.classList[0] === "update-input"){
        const productId = e.target.classList[1].slice(13)
        handleSaveNewQuantity(productId)
        renderPaymentSummary();
      }
    })
    
    function handleSaveNewQuantity(productId){
      document.querySelector(`.product-quantity-${productId}`).classList.remove("is-updating-quantity")
        const newQuantity = document.querySelector(`.update-input-${productId}`).value
    
        if(newQuantity < 1) return;
        const updatedCart = cart.map(item=>{
          if(item.productId === productId) item.quantity = +newQuantity;
          return item;
        })
    
        document.querySelector(`.quantity-label-${productId}`).innerHTML = newQuantity;
        updateCart(updatedCart)
        updateCheckoutQuantity()
    }
    
    function changeDeliveryDate(){
      const z = (id,value) =>{
        document.querySelector(`.delivery-date-${id}`).innerText = "Delivery Date: " + nextNDays(value);
      }
      cart.map((product)=>{
        const productRadioInputs = document.querySelectorAll(`#delivery-option-${product.productId}`)
        z(product.productId,product.deliveryDetails.time)
        
        productRadioInputs.forEach((input)=>{
          input.checked = input.value == product.deliveryDetails.time;
    
            input.addEventListener("change",()=>{
              const updatedCart = cart.map((item)=>{
                if(item.productId == product.productId) {
                    item.deliveryDetails.time = input.value;
                    let price = 0;
                    input.value == "9"? price = 0: input.value == "5"? price = 499: price = 999;
                    item.deliveryDetails.price = price;
                };
                return item
              })
    
              z(product.productId,input.value)
              updateCart(updatedCart)
              renderPaymentSummary();
            })
        })
      })
    }
    
    changeDeliveryDate()
}