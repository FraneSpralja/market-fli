// export const myAction = (state) => {
    
// }

export const userLogin = (state, user) => state.user = {...user}

export const userLogout = (state) => state.user = {}

export const setMyProducts = (state, products) => state.my_products = products

export const userActive = (state, data) => state.user_active = data

export const setMyLikes = (state, data) => state.my_likes = data