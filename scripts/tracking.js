import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatted } from "./utils/date.js";



const renderTracking = () =>{
    const url = new URL(window.location.href);
    
    const orderId = (url.searchParams.get("orderId"))
    const productId = (url.searchParams.get("productId"))
    
    const currentOrder = orders.find(order=>{
       return order.id == orderId
    })
    
    const {estimatedDeliveryTime,quantity} = currentOrder.products.find(item=>{
        return item.productId == productId
    })
    const {image,name} = getProduct(productId);

    document.querySelector(".order-tracking").innerHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formatted(estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `
}

loadProductsFetch().then(()=>{
    renderTracking()
})