import { addDoc, collection } from "@firebase/firestore"
import { FirebaseDB } from "../../firebase/config"
 
export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), newNote)
    console.log(doc)
  }
}