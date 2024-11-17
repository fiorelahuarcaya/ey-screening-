import Fastify from "fastify";
import cors from '@fastify/cors'

import puppeteer from "puppeteer";

import { authMiddleware } from "./auth/middleware";
import { generateToken } from "./auth/jwt";
import { DEFAULT_USER } from "./utils/consts";
import { theWorldBankList } from "./scrapping/theWorldBank";
import { offshoreLeaksList } from "./scrapping/offshoreLeaks";
import { ofacSanctionsList } from "./scrapping/ofacSanctions";

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();

// Fastify instance
const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: true
})

// Health check endpoint
fastify.get("/", async () => {
  return { api: "on" };
});

// Login route
fastify.post("/login", async (request, reply) => {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };

  if (username === DEFAULT_USER.name && password === DEFAULT_USER.password) {
    // for simplicity, we use the username as the userId
    const userId = username;

    // Generate a JWT token
    const token = await generateToken({ userId });
    return { token };
  } else {
    reply.code(401);
    throw new Error("Invalid username or password");
  }
});

fastify.get("/quotes", { preHandler: authMiddleware }, async () => {
  const page = await browser.newPage();
  await page.goto("http://quotes.toscrape.com/");

  const quotes: string[] = [];

  const elements = await page.$$(".quote .text");

  for (const element of elements) {
    const text = await page.evaluate((el) => el.textContent, element);
    if (text) quotes.push(text);
  }

  return { quotes };
});

// The World Bank
fastify.get(
  "/screening/the-world-bank",
  { preHandler: authMiddleware },
  async (request) => {
    const { search } = request.query as { search?: string };

    const { list } = await theWorldBankList({ search, browser });

    return { list, length: list.length };
  }
);

// Offshore Leaks Database
fastify.get(
  "/screening/offshore-leaks",
  { preHandler: authMiddleware },
  async (request) => {
    const { search } = request.query as { search?: string };

    const { list } = await offshoreLeaksList({ search, browser });

    return { list, length: list.length };
  }
);

// OFAC Sanctions List
fastify.get(
  "/screening/ofac-sanctions",
  { preHandler: authMiddleware },
  async (request, reply) => {
    const { search } = request.query as { search?: string };

    if (!search) {
      reply.code(400);
      throw new Error("Search query is required");
    }

    const { list } = await ofacSanctionsList({ search, browser });

    return { list, length: list.length };
  }
);

// Start the server
fastify.listen({ port: 3000 }, (_, address) => {
  console.log(`Server listening at ${address}`);
});
