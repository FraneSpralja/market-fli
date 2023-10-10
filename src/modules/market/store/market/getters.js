export const  loadProductsByCategory = (state) => {
    return state.products
}

export const  loadCartProducts = (state) => {
    return state.cart
}

export const totalPrice = (state) => {
    return state.cart.reduce((a, b) => { return a + b.price }, 0)
}

export const totalCartProducts = state => {
    return state.cart.reduce((a, b) => { return a + b.number }, 0)
}