import {renderOrderSummary} from "./orderSummary.js"
import { renderPaymentSummary } from "./paymentSummary.js";
import "./backend-practice.js"
import { fetchProducts } from "../data/products.js";
// import "../data/cart-class.js"


fetchProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary()
})