const productsGrid = document.querySelector(".products-grid")

let productsGridInnerHTML = "";
products.forEach((product)=>{
    productsGridInnerHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="product-id-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button data-id=${product.id} class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
    `
})
productsGrid.innerHTML = productsGridInnerHTML




document.querySelectorAll(".add-to-cart-button").forEach((button)=>{
  button.addEventListener("click",(e)=>{
    const productId = e.target.dataset.id;

    const quantity = +document.querySelector(`.product-id-${productId}`).value

    const item = cart.find( item => item.productId === productId )

    if(item){
      item.quantity += quantity
    }else{
      cart.push({
        productId,
        quantity,
      })
    }
    
    updateCartQuantity()
  })
})


updateCartQuantity()
function updateCartQuantity(){
  const cartQuantityDiv = document.querySelector(".cart-quantity");
  
  let cartQuantity = 0; 
  
  cart.map((product)=>{
    cartQuantity += product.quantity
  })
  
  cartQuantityDiv.innerHTML = cartQuantity;
}