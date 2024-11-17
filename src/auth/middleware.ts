import { verifyToken } from "./jwt";

import type { FastifyReply, FastifyRequest } from "fastify";

// Auth middleware
export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    reply.code(401);
    throw new Error("Unauthorized: Missing or invalid Authorization header");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await verifyToken(token);
    // Attach the payload (e.g., user info) to the request
    request.payload = payload;
  } catch (error) {
    reply.code(401);
    throw new Error("Unauthorized: Invalid or expired token");
  }
}
