import type { Browser } from "puppeteer";
import UserAgent from "user-agents";

export async function ofacSanctionsList({
  search = "",
  browser,
}: {
  search: string;
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

  const url = `https://sanctionssearch.ofac.treas.gov/`;

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  await page.screenshot({
    path: "hn.png",
  });

  await page.waitForSelector("#ctl00_MainContent_txtLastName", {
    timeout: 3000,
  });

  // Fill the search form
  await page.locator("#ctl00_MainContent_txtLastName").fill(search);

  // Click search button
  await page.locator("#ctl00_MainContent_btnSearch").click();

  // Wait for navigation to complete
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // Extract table rows and data in a single operation
  const list = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll("#gvSearchResults tbody tr")
    );

    if (!rows.length) {
      return [];
    }

    // Atributos: Name, Address, Type, Program(s), List, Score

    return rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      return {
        name: cells[0]?.textContent?.trim() || "",
        adress: cells[1]?.textContent?.trim() || "",
        type: cells[2]?.textContent?.trim() || "",
        programs: cells[3]?.textContent?.trim() || "",
        score: cells[4]?.textContent?.trim() || "",
      };
    });
  });

  return { list };
}
