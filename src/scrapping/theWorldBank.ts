import type { Browser } from "puppeteer";

export async function theWorldBankList({
  search,
  browser,
}: {
  search?: string;
  browser: Browser;
}) {
  const page = await browser.newPage();

  const url =
    "https://projects.worldbank.org/en/projects-operations/procurement/debarred-firms";

  await page.goto(url);

  await page.waitForSelector("#k-debarred-firms tbody tr");

  if (search) {
    // Fill the input field to filter results
    await page.locator("input#category").fill(search);
  }

  // Extract table rows and data in a single operation
  const list = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll("#k-debarred-firms tbody tr")
    );
    return rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      return {
        firstName: cells[0]?.textContent?.trim() || "",
        address: cells[2]?.textContent?.trim() || "",
        country: cells[3]?.textContent?.trim() || "",
        ineligibilityPeriod: {
          fromDate: cells[4]?.textContent?.trim() || "",
          toDate: cells[5]?.textContent?.trim() || "",
        },
        grounds: cells[6]?.textContent?.trim() || "",
      };
    });
  });

  return { list };
}
