import db from '@/helpers/db'
import storage from '@/helpers/storage'
import randomId from '@/helpers/randomId'
import { auth } from "@/helpers/auth"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc, onSnapshot } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const signUpUser = async( {commit},  {email, pass} ) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, pass)
        const { uid, accessToken } = userCredentials.user
        
        console.log(uid)

        const userRef = doc(db, 'users', uid)
        const User = await getDoc(userRef)

        const user = { ...User.data(), accessToken }
        commit('userLogin', user)

        return user

    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }
}

export const getMyProducts = async({ commit }, user_id) => {
    try {
        const products = []        
        const productsRef = collection(db, `products/user_${user_id}/items`)
        const myProducts = await getDocs(productsRef)
    
        myProducts.forEach((item) => {
            products.push(item.data())
        })

        commit('setMyProducts', products)

    } catch (error) {
        console.log(error)
    }
}

export const setNewProduct = async({ commit }, item) => {
    try {

        const { title, price, product_file, description, user_id } = item
        const id = randomId()
        const storageRef = ref(storage, `products/user_${user_id}/${id}`)
        
        const uploadImg = await uploadBytesResumable(storageRef, product_file)
        const img_url = await getDownloadURL(uploadImg.ref)

        const newProduct =  {
            title,
            price,
            description,
            user_id,
            id,
            img_url
        }

        await setDoc(doc(db, `products/user_${user_id}/items`, `item_${id}`),{
            ...newProduct
        })

        commit('setNewProduct', newProduct)

    } catch (error) {
        console.log(error)
    }
}