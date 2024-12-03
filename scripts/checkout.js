import {renderOrderSummary} from "./orderSummary.js"
import { renderPaymentSummary } from "./paymentSummary.js";
import "./backend-practice.js"
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js"



const loadPage = async () => {
    try{
        await loadProductsFetch();
    
        const ResolveValue = await new Promise((resolve) => {
            loadCart(()=>{
                resolve("value")
            })
        })
    }catch(error){
        console.log("Unexpected error, Try again later.")
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage()

/*
Promise.all([
    loadProductsFetch(),
    new Promise(resolve => {
        loadCart(()=>{
            resolve("Second value")
        })
    })
]).then((resolveValues)=>{
    // console.log(resolveValues)
    renderOrderSummary();
    renderPaymentSummary()
})
*/