import type { JWTPayload } from "jose";
import type { Payload } from "../auth/jwt";

declare module "fastify" {
  interface FastifyRequest {
    payload?: JWTPayload & Payload;
  }
}
