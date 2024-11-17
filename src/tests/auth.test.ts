import { describe, expect, it } from "vitest";
import { DEFAULT_USER } from "../utils/consts";

describe("auth", () => {
  it("should return error if unauthenticated", async () => {
    const res = await fetch("http://localhost:3000/quotes");
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toEqual("Unauthorized");
  });

  it("should return error if invalid credentials", async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "invalid", password: "invalid" }),
    });

    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toEqual("Unauthorized");
    expect(data.message).toEqual("Invalid username or password");
  });

  it("should login", async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: DEFAULT_USER.name,
        password: DEFAULT_USER.password,
      }),
    });

    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toHaveProperty("token");
  });
});
