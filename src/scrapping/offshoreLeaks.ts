import type { Browser } from "puppeteer";
import UserAgent from "user-agents";

export async function offshoreLeaksList({
  search = "",
  browser,
}: {
  search?: string;
  browser: Browser;
}) {
  const page = await browser.newPage();

  // Set a custom viewport to appear as a real user
  await page.setViewport({
    width: 1280, // Screen width
    height: 720, // Screen height
    deviceScaleFactor: 1, // Default screen scaling (normal display)
    isMobile: false, // Set true for mobile-like behavior
    hasTouch: false, // Set true if emulating touch
  });

  // Set a custom user agent to appear as a real user
  const userAgent = new UserAgent();
  await page.setUserAgent(userAgent.random().toString());

  const url = `https://offshoreleaks.icij.org/search?q=${search}&c=&j=&d=`;

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  await page.screenshot({
    path: "hn.png",
  });

  try {
    await page.waitForSelector(".modal-content", {
      timeout: 3000,
    });

    // Click accept
    await page.locator(".modal-content #accept").click();

    await new Promise((r) => setTimeout(r, 500));

    // Click submit button
    await page.locator(".modal-content button[type=submit]").click();
  } catch (_) {}

  // Extract table rows and data in a single operation
  const list = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll(".search__results__content tbody tr")
    );

    if (!rows.length) {
      return [];
    }

    return rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      return {
        entity: cells[0]?.textContent?.trim() || "",
        jurisdiction: cells[1]?.textContent?.trim() || "",
        linkedTo: cells[2]?.textContent?.trim() || "",
        dataFrom: cells[3]?.textContent?.trim() || "",
      };
    });
  });

  return { list };
}
