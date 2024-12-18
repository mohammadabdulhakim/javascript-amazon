import { cart, getCartQuantity, updateCart } from "../data/cart.js";
import { addOrder } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { currencyFormat } from "./utils/money.js";

export const renderPaymentSummary = () => {
  let itemsPriceCents = 0;
  let shippingCents = 0;
  cart.forEach((item) => {
    let product = getProduct(item.productId);

    itemsPriceCents += product.priceCents * item.quantity;
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
            <div>Items (${getCartQuantity()}):</div>
            <div class="payment-summary-money">$${currencyFormat(
              itemsPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currencyFormat(
              shippingCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currencyFormat(
              totalBeforeTaxInCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currencyFormat(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currencyFormat(
              totalInCents
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

  document.querySelector(".payment-summary").innerHTML = generatedHTML;

  document
    .querySelector(".place-order-button")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart }),
        });

        const order = await response.json();
        addOrder(order);

        updateCart([]);
      } catch (error) {
        console.log("Unexpected error")
      }

      window.location.href = "orders.html"
    });
};
