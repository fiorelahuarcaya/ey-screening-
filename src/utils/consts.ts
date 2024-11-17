import process from "node:process";

import "dotenv/config";

const ENV_JWT_SECRET = process.env.JWT_SECRET;

if (!ENV_JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

// Secret key for JWT signing and verification
export const JWT_SECRET = new TextEncoder().encode(ENV_JWT_SECRET);

export const DEFAULT_USER = {
  name: "user",
  password: "123",
};
