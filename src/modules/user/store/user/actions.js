import { auth } from "@/helpers/auth"
import db from '@/helpers/db'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

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