// export const myAction = (state) => {
    
// }

export const userLogin = (state, user) => {
    const logUser = { ...state.user }
    
    if(logUser.accessToken) {
        const { accessToken } = logUser
        state.user = {...user, accessToken}
    }

    if(!logUser.accessToken) state.user = {...user}
}

export const userLogout = (state) => state.user = {}

export const setMyProducts = (state, products) => state.my_products = products

export const userActive = (state, data) => state.user_active = data

export const setMyLikes = (state, data) => state.my_likes = data