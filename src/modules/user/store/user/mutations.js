// export const myAction = (state) => {
    
// }

export const userLogin = (state, user) => {
    state.user = {
        ...user,
        addres: undefined,
        phone: undefined,
        img_profile: undefined
    }
}

export const setMyProducts = (state, products) => {
    state.my_products = products
}