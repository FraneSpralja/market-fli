import db from '@/helpers/db'
import storage from '@/helpers/storage'
import randomId from '@/helpers/randomId'
import { auth } from "@/helpers/auth"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, where, query } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import user from '.'

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
        const queryProducts = query(collection(db, `products`), where("user_id", "==", `${user_id}` ))
        const myProducts = await getDocs(queryProducts)
    
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
        const id = randomId()
        const { title, price, product_file, description, user_id } = item
        const newProduct =  { title, price, description, user_id, id, }
        const itemRef = doc(db, `products/item_${id}` )
        
        const images = await saveImages(product_file, user_id, id)
        await setDoc(itemRef,{ ...newProduct })
        await updateDoc(itemRef, { images })
        await getMyProducts(user_id)

    } catch (error) {
        console.log(error)
    }
}

// Save images of the product
const saveImages = async (arr, user_id, id) => {
    const images = {}

    for(let i = 0; i < arr.length; i++) {
        let file = arr[i]

        const storageRef = ref(storage, `products/user_${user_id}/item_${id}/img_${i + 1}`)
        const uploadImg = await uploadBytesResumable(storageRef, file)
        const url = await getDownloadURL(uploadImg.ref)
        images[`img_${i + 1}`] = url
    }

    return images
}