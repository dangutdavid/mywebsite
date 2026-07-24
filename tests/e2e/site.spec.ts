import { expect, test } from "@playwright/test";

test("home page renders primary routes and navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Salesforce, AI and data solutions/i })).toBeVisible();
  await page.getByRole("link", { name: "View services" }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { name: "Services" })).toBeVisible();
});

test("mobile menu opens, links and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeHidden();
});

test("contact form validates and accepts development submission", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Enter your name.")).toBeVisible();
  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Organisation").fill("Example Ltd");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Service of interest").selectOption("Salesforce engineering and architecture");
  await page.getByLabel("Desired timing").selectOption("Within 1-3 months");
  await page.getByLabel("Preferred contact method").selectOption("Email");
  await page.getByLabel("Project summary").fill("We need senior Salesforce architecture review and integration advice for an active programme.");
  await page.getByLabel(/I consent/).check();
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText(/Submission captured in development mode/)).toBeVisible();
});

test("custom not found page is useful", async ({ page }) => {
  await page.goto("/missing-page");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

