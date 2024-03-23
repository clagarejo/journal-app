import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FireBaseAuth } from './config'


const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async () => {

    try {

        const result = await signInWithPopup(FireBaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {
        const errorMessage = error.message

        return {
            ok: false,
            errorMessage
        }

    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, password)
        const { uid, photoURL } = resp.user

        // TODO: actualizar el usuario en firebase
        updateProfile( FireBaseAuth.currentUser, {displayName})

        return {
            ok: true,
            displayName, email, photoURL, uid
        }


    } catch (error) {

        return {
            ok: false,
            errorMessage: error.message
            
        }

    }

}

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        
        const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password)
        const {displayName, photoURL, uid } = resp.user

        return {
            ok: true,
            displayName, photoURL, uid
        }


    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
            
        }

    }

}

export const logoutFirebase = async () => {
    return await FireBaseAuth.signOut()
}