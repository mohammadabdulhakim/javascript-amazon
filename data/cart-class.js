class Cart {
    cartItems = undefined;
    #storageKey;
    defaultCart = [
        {
          productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity: 3,
          deliveryDetails: {
            time: "5",
            price: 499,
          },
        },
        {
          productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
          quantity: 1,
          deliveryDetails: {
            time: "9",
            price: 0,
          },
        },
        {
          productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
          quantity: 7,
          deliveryDetails: {
            time: "1",
            price: 999,
          },
        },
    ];

    constructor(storageKey){
        this.#storageKey = storageKey;
        this.#generateCart;
    }
    #generateCart() {
    this.cartItems =
        JSON.parse(localStorage.getItem(this.#storageKey)) || this.defaultCart;
    }
    addToCart(productId) {
    const quantity =
        +document.querySelector(`.product-id-${productId}`)?.value || 1;

    const item = this.cartItems.find((item) => item.productId === productId);

    if (item) {
        item.quantity += quantity;
    } else {
        this.cartItems.push({
        productId,
        quantity,
        deliveryDetails: {
            time: "5",
            price: 499,
        },
        });
    }

    this.updateCart();
    }
    getCartQuantity(){
          let cartQuantity = 0;
        
          this.cartItems.map((product) => {
            cartQuantity += product.quantity;
          });
        
          return cartQuantity;
    }
    updateCart(updatedCart) {
        updatedCart ? (this.cartItems = updatedCart) : (updatedCart = this.cartItems);
    
        localStorage.setItem(this.#storageKey, JSON.stringify(updatedCart));
    }
}

   
  const cart = new Cart("cart-oop")
  const businessCart = new Cart("business-cart-oop")

  console.log(cart)
  console.log(businessCart)
  