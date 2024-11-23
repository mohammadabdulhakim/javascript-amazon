import { cart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { currencyFormat } from "./utils.js";


export const renderPaymentSummary = () => {
    let itemsPriceCents = 0;
    let shippingCents = 0;
    cart.forEach(item => {
        let product = getProduct(item.productId)
        
        itemsPriceCents += (product.priceCents * item.quantity);
        shippingCents += item.deliveryDetails.price;
    });

    itemsPriceCents;
    shippingCents;
    const totalBeforeTaxInCents = itemsPriceCents + shippingCents;
    const taxCents = totalBeforeTaxInCents * 0.1;
    const totalInCents = totalBeforeTaxInCents + taxCents; 

    const generatedHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${currencyFormat(itemsPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currencyFormat(shippingCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currencyFormat(totalBeforeTaxInCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currencyFormat(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currencyFormat(totalInCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `

    document.querySelector(".payment-summary").innerHTML = generatedHTML;
};

