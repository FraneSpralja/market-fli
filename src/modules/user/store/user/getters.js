// export const myGetter = (state) => {
//     return state.algo
// }

import { userActive } from "./mutations"

export const getUser = (state) => state.user
export const isActive = (state) => state.user_active

export const getMyProducts = (state) => state.my_products
export const getMyShopping = (state) => state.my_shopping
export const getMySales = (state) => state.my_sales
export const getMyLikes = (state) => state.my_likes
