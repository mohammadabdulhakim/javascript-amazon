import { currencyFormat } from "../scripts/utils/money.js";

export const getProduct = (productId) =>{
  let matchingProduct;

  products.forEach(product=>{
    if(product.id === productId) matchingProduct = product;
  })

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  ratingImageName(){
    return `rating-${this.rating.stars * 10}.png`
  }

  getPrice(){
    return `$${currencyFormat(this.priceCents)}`
  }

  additionalHTMLinfo(){
    return ``
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(projectDetails){
    super(projectDetails);
    this.sizeChartLink = projectDetails.sizeChartLink;
  }

  additionalHTMLinfo(){
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `
  }
}
export const unwantedProducts = [
  "5968897c-4d27-4872-89f6-5bcb052746d7",
  "04701903-bc79-49c6-bc11-1af7e3651358",
  "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
  "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
  "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
  "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7"
]



export let products = [];


export const loadProductsFetch = () =>{
  const promise = fetch("https://supersimplebackend.dev/products").then((response)=>{
    return response.json()
  }).then((data)=>{
    products = data.reduce((acc,product)=>{
      if(!unwantedProducts.includes(product.id)){
        const newProduct = product.type === "clothing"? new Clothing(product): new Product(product);
        acc.push(newProduct)
      }
      return acc;
    },[])
  })
  /*
  .catch(error=>{
    console.log("Unexpected Error, try again")
  })
  */

  return promise;
} 


export const loadProducts = (callbackFunction) =>{
  const xhr = new XMLHttpRequest()

  xhr.addEventListener("load",()=>{
    products = JSON.parse(xhr.response).reduce((acc,product)=>{
      if(!unwantedProducts.includes(product.id)){
        const newProduct = product.type === "clothing"? new Clothing(product): new Product(product);
        acc.push(newProduct)
      }
      return acc;
    },[])

    
    callbackFunction()
  })
  xhr.addEventListener("error",(error)=>{
    console.log("Unexpected Error")
  })

  xhr.open("GET", "https://supersimplebackend.dev/products")
  xhr.send();
} 



