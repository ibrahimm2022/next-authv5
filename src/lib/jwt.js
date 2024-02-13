import jwt from "jsonwebtoken";

export function signJWT(payload) {
  const { JWT_USER_TO_SECRET } = process.env;
  if (!JWT_USER_TO_SECRET) return;
  const token = jwt.sign(payload, JWT_USER_TO_SECRET);

  // console.log(token);
  return token;
}

export function verifyJWT(token) {
  try {
    const { JWT_USER_TO_SECRET } = process.env;
    // console.log(JWT_USER_TO_SECRET);
    if (!JWT_USER_TO_SECRET) return;

    const decoded = jwt.verify(token, JWT_USER_TO_SECRET);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
}
