export const orders = JSON.parse(localStorage.getItem("orders")) || []; 

export const addOrder = (order) =>{
    orders.unshift(order)
    updateOrders();
}

const updateOrders = () =>{
    localStorage.setItem("orders", JSON.stringify(orders))
}