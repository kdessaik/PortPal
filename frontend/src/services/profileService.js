import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export const getProviderProfile = async (uid) => {
  const ref = doc(db, "providers", uid)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export const saveProviderProfile = async (uid, data) => {
  await setDoc(
    doc(db, "providers", uid),
    {
      ...data,
      uid,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

export const getOrganizationProfile = async (uid) => {
  const ref = doc(db, "organizations", uid)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export const saveOrganizationProfile = async (uid, data) => {
  await setDoc(
    doc(db, "organizations", uid),
    {
      ...data,
      uid,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}
