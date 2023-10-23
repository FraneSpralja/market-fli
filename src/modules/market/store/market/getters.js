export const  loadProducts = (state) => {
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

export const selectItemByCategory = (state) => {
    const categories = []
    const categoryArr = state.products
    for(let i = 0; i < categoryArr.length; i++) {
        const category = categoryArr[i].category
        for(let value in category) {
            categories.push(category[value])
        }
    }
    return categories
        .filter((item, index) => categories
            .indexOf(item) === index )
}

export const featuredProducts = (state) => {
    return state.featured
}