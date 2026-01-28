import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { collection, query, where, getDocs, limit } from "firebase/firestore"
import { db } from "./firebase"

export async function createUserProfile(user, role) {
  if (!user) return

  const userRef = doc(db, "users", user.uid)

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    role,
    createdAt: serverTimestamp(),
  })
}

export async function getUserProfile(uid) {
  if (!uid) return null

  const userRef = doc(db, "users", uid)
  const snapshot = await getDoc(userRef)

  return snapshot.exists() ? snapshot.data() : null
}

// Fetch a list of service providers (role = "provider")
export async function getProviders() {
  const q = query(
    collection(db, "users"),
    where("role", "==", "provider"),
    limit(10) // optional: limit for pagination
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => doc.data())
}

// Fetch a list of organizations (role = "organization")
export async function getOrganizations() {
  const q = query(
    collection(db, "users"),
    where("role", "==", "organization"),
    limit(10)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => doc.data())
}