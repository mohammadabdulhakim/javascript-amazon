import {currencyFormat} from "../scripts/utils/money.js"

describe("Test: currencyFormat",()=>{
    it("works in normal cases",()=>{
        expect(currencyFormat(2050)).toEqual("20.50");
    })

    it("works with 0",()=>{
        expect(currencyFormat(0)).toEqual("0.00");
    })

    it("works with fractions",()=>{
        expect(currencyFormat(3000.5)).toEqual("30.01")
    })
})