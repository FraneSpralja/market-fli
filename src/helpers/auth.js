import app from '@/firebase/config'
import db from '@/helpers/db'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore'

export const auth = getAuth(app)

export const createUser = async( data ) => {
    try {        
        const  { name, user_name, email, pass } = data
    
        const { user } = await createUserWithEmailAndPassword(auth, email, pass)
        console.log(user)

        const newUser = await setDoc(doc(db, 'users', user.uid), {
            name,
            user_name,
            email,
            id: user.uid,
        })

    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }
}