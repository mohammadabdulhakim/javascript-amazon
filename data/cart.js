export const cart = [];

export function addToCart(event){
    const productId = event.target.dataset.id;
  
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
  }