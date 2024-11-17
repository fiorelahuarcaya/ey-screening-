import { jwtVerify, SignJWT } from "jose";
import { JWT_SECRET } from "../utils/consts";

import type { JWTPayload } from "jose";

export type Payload = {
  userId: string;
};

/**
 * Generate a JWT token
 */
export async function generateToken(payload: Payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET);
  return token;
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string) {
  return await jwtVerify<JWTPayload & Payload>(token, JWT_SECRET);
}
