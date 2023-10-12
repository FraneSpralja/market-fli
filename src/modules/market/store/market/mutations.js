// export const myAction = (state) => {
    
// }

export const defineProducts = ( state, arr ) => {
    state.products = arr
}

export const addToCart = (state, product) => {
    const cart = [ ...state.cart ]
    const newProduct = { ...product };
    const item = cart.filter( prod => prod.id === newProduct.id );

    if(item.length <= 0) {
        newProduct.number = 1
        state.cart = [ newProduct, ...cart ]
    } else {
        const index = cart.findIndex(prod => prod.id === product.id)
        const newCart = cart.filter(prod => prod.id !== product.id)
        const addProduct = { ...item[0] }
        addProduct.number = ++addProduct.number
        addProduct.price = product.price * addProduct.number
        
        newCart.splice(index, 0, addProduct)
        state.cart = [ ...newCart ]
    }
}

export const deleteFromCart = (state, product) => {
    const newCart = state.cart.filter( (prod) => prod.id !==  product.id)
    state.cart = newCart;
}

export const lessOneProduct = (state, id) => {
    const cart = [ ...state.cart ];
    const item = cart.filter(item => item.id === id)[0]
    const newCart = cart.filter(item => item.id !== id)

    if(item.number > 1) {
        const index = cart.findIndex(item => item.id === id)
        const price = item.price / item.number
        item.number = --item.number
        item.price = item.price - price
        newCart.splice(index, 0, item)

        state.cart = [ ...newCart ]
    } else {
        state.cart = [ ...newCart ]
    }
}

export const productsByCategory = (state, data) => {
    state.products = [ ...data ]
}

export const randomProducts = (state, data) => {
    const productsIndex = data.map( (id) => {
        return state.products.findIndex((item) => item.id === id)
    } )

    const featured = productsIndex.map( (index) => {
        return state.products[index]
    } )
    
    state.featured = [ ...featured ]
}