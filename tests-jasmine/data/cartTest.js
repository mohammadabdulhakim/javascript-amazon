import {addToCart, cart, generateCart} from "../../data/cart.js"

describe("Test: addToCart:",()=>{    
    it("adds new item",()=>{
        spyOn(localStorage, "getItem").and.callFake(()=>{
            return JSON.stringify([]);
        })
        spyOn(localStorage, "setItem")
        generateCart();

        addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(cart.length).toEqual(1)
        expect(cart[0].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(cart[0].quantity).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })

    it("increase the quantity of an existing item",()=>{
        spyOn(localStorage, "getItem").and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                    quantity: 1,
                    deliveryDetails: {
                        time: "5",
                        price: 499,
                      },
                }
            ]);
        })
        spyOn(localStorage, "setItem")
        generateCart();


        addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(cart.length).toEqual(1)
        expect(cart[0].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(cart[0].quantity).toEqual(2)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })
})