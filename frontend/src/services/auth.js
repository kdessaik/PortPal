import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "./firebase"

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, provider)
}

export const logout = async () => {
  await signOut(auth)
}
