import { test, expect } from '@playwright/test';
import fs from 'fs';

test.setTimeout(60000);

test('Book Store Automation Test', async ({ page }) => {

    const username = "saisanket";
    const password = "Sanke@123";
    const bookName = "Learning JavaScript Design Patterns";


    // Step 1: Navigate to DemoQA
    await page.goto("https://demoqa.com", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    // Scroll because Book Store card is at bottom
    await page.evaluate(() => window.scrollBy(0, 500));

    // Step 2: Open Book Store Application
    const bookStoreCard = page.getByText("Book Store Application");
    await bookStoreCard.scrollIntoViewIfNeeded();
    await bookStoreCard.click();

    // Step 3: Click Login
    await page.locator("#login").waitFor({ state: "visible" });
    await page.locator("#login").click();

    // Step 4: Enter credentials
    await page.locator("#userName").fill(username);
    await page.locator("#password").fill(password);

    // Step 5: Login
    await page.locator("#login").click();

    // Wait until profile page loads
    await page.waitForURL("**/profile");

    // Step 6: Validate username
    await expect(page.locator("#userName-value")).toContainText(username);

    // Wait a moment for buttons to render
    await page.waitForTimeout(1000);

    // Validate Logout button (first submit button)
    const logoutButton = page.locator("#submit").first();
    await expect(logoutButton).toBeVisible();

    // Step 7: Go to Book Store
    await page.locator("#gotoStore").click();

    await page.waitForURL("**/books");

    // Step 8: Search for the book
    await page.locator("#searchBox").fill(bookName);

    // Step 9: Validate search result
    const book = page.getByRole('link', { name: bookName });
    await expect(book).toBeVisible();

    // Step 10: Capture Author & Publisher
    const author = await page.locator("text=Addy Osmani").first().textContent();
    const publisher = await page.locator("text=O'Reilly Media").first().textContent();

    const bookDetails =
        `Title: ${bookName}
Author: ${author}
Publisher: ${publisher}`;

    // Step 11: Write details to file
    fs.writeFileSync("bookDetails.txt", bookDetails);

    console.log(bookDetails);

    // Step 12: Logout
    await logoutButton.click();

});