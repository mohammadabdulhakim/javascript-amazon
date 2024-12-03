import {renderOrderSummary} from "./orderSummary.js"
import { renderPaymentSummary } from "./paymentSummary.js";
import "./backend-practice.js"
import { fetchProducts } from "../data/products.js";
import { fetchCart } from "../data/cart.js";
// import "../data/cart-class.js"


Promise.all([
    new Promise(resolve =>{
        fetchProducts(()=>{
            resolve("First value")
        })
    }),
    new Promise(resolve => {
        fetchCart(()=>{
            resolve("Second value")
        })
    })
]).then((resolveValues)=>{
    // console.log(resolveValues)
    renderOrderSummary();
    renderPaymentSummary()
})
