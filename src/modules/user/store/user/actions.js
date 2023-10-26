import db from '@/helpers/db'
import storage from '@/helpers/storage'
import randomId from '@/helpers/randomId'
import { auth } from "@/helpers/auth"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, where, query, arrayUnion } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const signUpUser = async( {commit},  {email, pass} ) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, pass)
        const { uid, accessToken } = userCredentials.user

        const userRef = doc(db, 'users', uid)
        const User = await getDoc(userRef)

        const user = { ...User.data(), accessToken }
        console.log(user)
        commit('userLogin', user)

        return user

    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }
}

export const activeUser = ({commit}) => {
    onAuthStateChanged(auth, ( user ) => {
        if(user) {
            const { uid } = user;
            commit('userActive', uid)
        } else {
            commit('userActive', null)
        }
    })
}

export const signOutUser = async( {commit} ) => {
    try {
        await signOut(auth)
        commit('userLogout')
    } catch (error) {
        console.log(error)
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

export const setNewProduct = async({ commit, dispatch }, item) => {
    try {
        const id = randomId()
        const { title, price, product_file, description, user_id, category } = item
        const newProduct =  { title, price, description, user_id, id, }
        const itemRef = doc(db, `products/item_${id}` )
        
        const images = await saveImages(product_file, user_id, id)
        await setDoc(itemRef,{ ...newProduct })
        await updateDoc(itemRef, { images, category })
        await dispatch('getMyProducts')

    } catch (error) {
        console.log(error)
    }
}

export const userLikeProduct = async({commit}, { user_id, product_id }) => {

    try {        
        const userRef = doc(db, `users/${user_id}`)
        const user = await getDoc(userRef)
    
        if(!user.data().likes) {
            await updateDoc(userRef, {likes: [ product_id ]})
            console.log(product_id)
        } else {

            if(!user.data().likes.includes(product_id)) {
                await updateDoc(userRef, {
                    likes: arrayUnion(product_id)
                })
            } else {
                console.log('ya existe ese id')
            }

            const updatedUser = await getDoc(userRef)
            console.log(updatedUser.data().likes)
        }
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