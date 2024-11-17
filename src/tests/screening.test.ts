import { beforeAll, describe, expect, it } from "vitest";
import { DEFAULT_USER } from "../utils/consts";

describe("screening", () => {
  let token: string;

  beforeAll(async () => {
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

    token = data.token;
  });

  it(
    "should get all items",
    {
      timeout: 30000,
    },
    async () => {
      const res = await fetch(
        "http://localhost:3000/screening/the-world-bank",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toHaveProperty("list");

      const { list } = data;

      expect(list).toHaveProperty("length");
      expect(list.length).toEqual(1297);
    }
  );

  it(
    "should filter by name",
    {
      timeout: 30000,
    },
    async () => {
      const res = await fetch(
        "http://localhost:3000/screening/the-world-bank?search=akou",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toHaveProperty("list");

      const { list } = data;

      expect(list).toHaveProperty("length");
      expect(list.length).toEqual(1);
    }
  );

  it(
    "should be empty when no results",
    {
      timeout: 30000,
    },
    async () => {
      const res = await fetch(
        "http://localhost:3000/screening/the-world-bank?search=mdp",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toHaveProperty("list");

      const { list } = data;

      expect(list).toHaveProperty("length");
      expect(list.length).toEqual(0);
    }
  );
});
