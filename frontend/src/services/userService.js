import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export const getUserProfile = async (uid) => {
  const ref = doc(db, "users", uid)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export const createUserProfile = async (user, role) => {
  const ref = doc(db, "users", user.uid)

  await setDoc(ref, {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role,
    createdAt: serverTimestamp(),
  })
}
