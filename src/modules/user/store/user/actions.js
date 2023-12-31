import db from '@/helpers/db'
import storage from '@/helpers/storage'
import randomId from '@/helpers/randomId'
import { auth } from "@/helpers/auth"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, where, query, arrayUnion, arrayRemove } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const signUpUser = async( {commit},  {email, pass} ) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, pass)
        const { uid, accessToken } = userCredentials.user

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

export const activeUser = ({commit}) => {
    onAuthStateChanged(auth, async ( user ) => {
        if(user) {
            const { uid } = user;
            const loadUser = await getDoc(doc(db, 'users', uid))
            commit('userActive', uid)
            commit('userLogin', loadUser.data())
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

export const getMyProducts = async({ commit, dispatch }, user_id) => {
    try {
        const products = []        
        const queryProducts = query(collection(db, `products`), where("user_id", "==", `${user_id}` ))
        const myProducts = await getDocs(queryProducts)
    
        myProducts.forEach((item) => {
            products.push(item.data())
        })

        commit('setMyProducts', products)
        await dispatch('getUserLikes', user_id)

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

export const userLikeProduct = async({commit, dispatch}, { user_id, product_id }) => {

    try {
        const userRef = doc(db, `users/${user_id}`)
        const itemRef = doc(db, `products/item_${product_id}`)

        const product = await getDoc(itemRef)
        const user = await getDoc(userRef)
    
        if(product.data().user_id !== user_id) {
            if(!user.data().likes) {
                await updateDoc(userRef, {likes: [ product_id ]})
                console.log(`el producto id ${product_id} fue agregado a tu lista`)
                return true
            } else {
                if(!user.data().likes.includes(product_id)) {
                    await updateDoc(userRef, {
                        likes: arrayUnion(product_id)
                    })
                    console.log(`el producto id ${product_id} fue agregado a tu lista`)
                    return true
                } else {
                    await updateDoc(userRef, {
                        likes: arrayRemove(product_id)
                    })

                    console.log(`el producto id ${product_id} fue eliminado de tu lista`)
                    return false
                }
            }
        } else {
            console.log(`el producto con id ${product_id} fu publicado por ti`)
        }

        dispatch('getUserLikes', user_id)

    } catch (error) {
        console.log(error)
    }
}

export const getUserLikes = async ({commit}, user_id) => {
    const likes = []
    const userRef = doc(db, `users/${user_id}`)

    try {
        const userLikes = await getDoc(userRef)

        for(let i = 0; i < userLikes.data().likes.length; i++) {
            let id = userLikes.data().likes[i]
            const itemRef = doc(db, `products/item_${id}`)
            const like = await getDoc(itemRef)

            likes.push(like.data())
        }

        commit('setMyLikes', likes)
        
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