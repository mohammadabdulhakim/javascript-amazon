import {currencyFormat} from "../scripts/utils/money.js"

console.log("convert cents into dollars:")


console.log("works with normal cases")
if (currencyFormat(2050) === '20.50'){
    console.log("passed")
    
}else{
    console.log("failed")
}


console.log("works with 0")
if (currencyFormat(0) === '0.00'){
    console.log("passed")
    
}else{
    console.log("failed")
}

console.log("works with fractions")
if (currencyFormat(2000.7) === '20.01'){
    console.log("passed")
    
}else{
    console.log("failed")
}