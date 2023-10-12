// export const myAction = async ({ commit }) => {

// }
import axios from "axios"

export const getProducts = async( {commit} ) => {
    try {        
        const url = 'https://fakestoreapi.com/products'
        const { data } = await axios.get(url)
        commit('defineProducts', data)
    } catch (error) {        
        console.log(error)
    }
}

export const addProductsToCarts = async( {commit}, id ) => {
    try {        
        const url = 'https://fakestoreapi.com/products'
        const { data } = await axios.get(`${url}/${id}`)
        commit('addToCart', data)
    } catch (error) {
        console.log(error)
    }
}

export const deleteCartProduct = async( {commit}, id ) => {
    try {
        const url = 'https://fakestoreapi.com/products'
        const { data } = await axios.get(`${url}/${id}`)
        commit('deleteFromCart', data)
    } catch (error) {        
        console.log(error)
    }
}

export const getProductsByCategory = async({commit}, category) => {
    try {        
        const url = 'https://fakestoreapi.com/products'
        const { data } = await axios.get(url);
        let categories = null
        if(category === 'all') {
            categories = [ ...data ]
        } else {
            const products = [ ...data ]
            categories = products.filter((item) => item.category == category)
        }
    
        commit('productsByCategory', categories)
    } catch (error) {
        console.log(error)
    }
}

export const getRandomProducts = async({commit}) => {
    try {       
        const random = []
        const url = 'https://fakestoreapi.com/products';
        const { data } = await axios.get(url)
        const productsId = [ ...data ].map( (item) => item.id )
    
        for(let i = 0; i < 3; i++) {
            random.push(Math.floor(Math.random() * productsId[productsId.length - 1]) + productsId[0])
        }
    
        commit('randomProducts', random)
    } catch (error) {
        console.log(error)
    }
}