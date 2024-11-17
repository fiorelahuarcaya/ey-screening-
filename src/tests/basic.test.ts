import { describe, expect, it } from "vitest";

describe("Basic", () => {
  it("heatlh check should work", async () => {
    const res = await fetch("http://localhost:3000/");
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toEqual({ api: "on" });
  });
});
