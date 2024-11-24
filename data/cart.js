const defaultCart = [
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

export let cart;

export function generateCart(){
  cart = JSON.parse(localStorage.getItem("cart")) || defaultCart;
}

export function addToCart(productId) {
  const quantity = +document.querySelector(`.product-id-${productId}`)?.value || 1;

  const item = cart.find((item) => item.productId === productId);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryDetails: {
        time: "5",
        price: 499,
      },
    });
  }

  updateCart();
}

export const getCartQuantity = () =>{
  let cartQuantity = 0;
    
      cart.map((product) => {
        cartQuantity += product.quantity;
      });

  return cartQuantity;
};

export function updateCart(updatedCart) {
  updatedCart ? (cart = updatedCart) : (updatedCart = cart);

  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
