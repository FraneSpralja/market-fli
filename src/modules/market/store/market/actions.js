// export const myAction = async ({ commit }) => {

// }
import axios from "axios"

export const getProducts = async( {commit} ) => {
    const url = 'https://fakestoreapi.com/products'
    const { data } = await axios.get(url)
    commit('defineProducts', data)
}

export const addProductsToCarts = async( {commit}, id ) => {
    const url = 'https://fakestoreapi.com/products'
    const { data } = await axios.get(`${url}/${id}`)
    commit('addToCart', data)
}

export const deleteCartProduct = async( {commit}, id ) => {
    const url = 'https://fakestoreapi.com/products'
    const { data } = await axios.get(`${url}/${id}`)
    commit('deleteFromCart', data)
}