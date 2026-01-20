import { auth } from "./_firebaseAdmin"


export const handler = async (event, context) => {
try {
const token = event.headers.authorization?.split("Bearer ")[1]


if (!token) {
return { statusCode: 401, body: "Unauthorized" }
}


const decoded = await auth.verifyIdToken(token)


return {
statusCode: 200,
body: JSON.stringify({ uid: decoded.uid }),
}
} catch (err) {
return { statusCode: 401, body: "Invalid token" }
}
}