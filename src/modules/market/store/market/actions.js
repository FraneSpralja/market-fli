import app from '@/firebase/config'
import db from '@/helpers/db'
import { collection, doc, getDocs, getDoc } from 'firebase/firestore'

import axios from "axios"

export const getProducts = async( {commit} ) => {
    
    try {
        const products = []
        const productsRef = collection(db, 'products')
        const items = await getDocs(productsRef)
        
        items.forEach((item) => products.push(item.data()))
        commit('defineProducts', products)
    } catch (error) {
        
    }
}

/* export const addProductsToCarts = async( {commit}, id ) => {
    try {        
        const url = 'https://fakestoreapi.com/products'
        const { data } = await axios.get(`${url}/${id}`)
        commit('addToCart', data)
    } catch (error) {
        console.log(error)
    }
} */

export const addProductsToCarts = async( {commit}, id ) => {
    try {        
        const Ref = doc(db, 'products', `item_${id}`)
        const data = await getDoc(Ref)
        commit('addToCart', data.data())
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
        const categories = []
        if(category === 'all') {
            const allRef = collection(db, 'products')
            const getCategories = await getDocs(allRef)
            getCategories.forEach((item) => {
                categories.push(item.data())
            })
        } else {
            const getCategories = await getDocs(collection(db, 'products'))
            getCategories.forEach((item) => {
                if(Object.values(item.data().category).includes(category)) categories.push(item.data())
            })
        }
    
        commit('productsByCategory', categories)
    } catch (error) {
        console.log(error)
    }
}

export const getRandomProducts = async({commit}) => {
    try {       
        const products = []
        const productRef = collection(db, 'products')
        const docs = await getDocs(productRef)

        docs.forEach((item) => products.push(item.data()))
        const productsId = [ ...products ].map( (item) => item.id )

        const random = productsId
            .map( item => ({ item, sort: Math.random() }))
            .sort((a, b) => (a.sort - b.sort), 0)
            .map( ( {item} ) => item ).slice(0, 3)

            commit('randomProducts', random)
    } catch (error) {
        console.log(error)
    }
}