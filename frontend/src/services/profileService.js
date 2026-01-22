import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

/**
 * Get a provider profile by UID
 * @param {string} uid - User ID
 * @returns {object|null} Profile data or null if not exists
 */
export const getProviderProfile = async (uid) => {
  if (!uid) return null

  try {
    const ref = doc(db, "providers", uid)
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : null
  } catch (error) {
    console.error("Error fetching provider profile:", error)
    return null
  }
}

/**
 * Save/update a provider profile
 * @param {string} uid - User ID
 * @param {object} data - Profile data
 */
export const saveProviderProfile = async (uid, data) => {
  if (!uid || !data) return

  try {
    const ref = doc(db, "providers", uid)
    await setDoc(
      ref,
      {
        ...data,
        uid,
        updatedAt: serverTimestamp(),
      },
      { merge: true } // only updates fields in data
    )
  } catch (error) {
    console.error("Error saving provider profile:", error)
    throw error
  }
}

/**
 * Get an organization profile by UID
 * @param {string} uid - User ID
 * @returns {object|null} Profile data or null if not exists
 */
export const getOrganizationProfile = async (uid) => {
  if (!uid) return null

  try {
    const ref = doc(db, "organizations", uid)
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : null
  } catch (error) {
    console.error("Error fetching organization profile:", error)
    return null
  }
}

/**
 * Save/update an organization profile
 * @param {string} uid - User ID
 * @param {object} data - Profile data
 */
export const saveOrganizationProfile = async (uid, data) => {
  if (!uid || !data) return

  try {
    const ref = doc(db, "organizations", uid)
    await setDoc(
      ref,
      {
        ...data,
        uid,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  } catch (error) {
    console.error("Error saving organization profile:", error)
    throw error
  }
}
