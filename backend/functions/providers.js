import { db, auth } from "./_firebaseAdmin"


export const handler = async (event) => {
try {
const token = event.headers.authorization?.split("Bearer ")[1]
const decoded = await auth.verifyIdToken(token)


if (event.httpMethod === "GET") {
const snap = await db.collection("providers").get()
const data = snap.docs.map(doc => doc.data())


return {
statusCode: 200,
body: JSON.stringify(data),
}
}


if (event.httpMethod === "POST") {
const body = JSON.parse(event.body)


await db.collection("providers").doc(decoded.uid).set({
...body,
uid: decoded.uid,
updatedAt: admin.firestore.FieldValue.serverTimestamp(),
}, { merge: true })


return { statusCode: 200, body: "Provider saved" }
}


return { statusCode: 405, body: "Method Not Allowed" }
} catch (err) {
return { statusCode: 401, body: err.message }
}
}