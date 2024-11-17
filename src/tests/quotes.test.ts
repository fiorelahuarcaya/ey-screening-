import { describe, expect, it } from "vitest";
import { DEFAULT_USER } from "../utils/consts";

describe("quotes", () => {
  it("should return the correct quotes", async () => {
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

    const token = data.token;

    const res2 = await fetch("http://localhost:3000/quotes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data2 = await res2.json();

    expect(res2.status).toBe(200);
    expect(data2).toHaveProperty("quotes");

    const quotes = data2.quotes;

    const expectedQuotes = [
      "“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”",
      "“It is our choices, Harry, that show what we truly are, far more than our abilities.”",
      "“There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.”",
      "“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”",
      "“Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring.”",
      "“Try not to become a man of success. Rather become a man of value.”",
      "“It is better to be hated for what you are than to be loved for what you are not.”",
      "“I have not failed. I've just found 10,000 ways that won't work.”",
      "“A woman is like a tea bag; you never know how strong it is until it's in hot water.”",
      "“A day without sunshine is like, you know, night.”",
    ];

    expect(quotes).toEqual(expectedQuotes);
  });
});
