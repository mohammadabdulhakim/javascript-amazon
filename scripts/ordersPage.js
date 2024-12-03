import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { currencyFormat } from "./utils/money.js";

console.log(orders);

const renderOrdersPage = () =>{
    document.querySelector(".orders-grid").innerHTML = `
        ${orders.map(
          (order) =>
            `<div class="order-container">
    
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${order.orderTime.slice(5, 10)}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${currencyFormat(order.totalCostCents)}</div>
                  </div>
                </div>
    
                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>
    
              <div class="order-details-grid">
                    ${order.products.map((item) => {
                        const product = getProduct(item.productId);
                        console.log(product)
                      return `
                      <div class="product-image-container">
                        <img src="${product.image}">
                        </div>
    
                        <div class="product-details">
                        <div class="product-name">
                            ${product.name}
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: ${item.estimatedDeliveryTime.slice(5, 10)}
                        </div>
                        <div class="product-quantity">
                            Quantity: ${item.quantity}
                        </div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                        </div>
    
                        <div class="product-actions">
                        <a href="tracking.html?orderId=${order.id}&productId=${item.productId}">
                            <button class="track-package-button button-secondary">
                            Track package
                            </button>
                        </a>
                </div>`
                ;
                    }).join("")}
              </div>
            </div>`
        )}
    `;
}

loadProductsFetch().then(()=>{
    renderOrdersPage();
})