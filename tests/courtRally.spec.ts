import { test, expect } from '@playwright/test';

test('Sign in opens the login page', async ({ page }) => {
  await page.goto('https://courtrally.app/');

  // Click the Sign in link in the header.
  const signInLink = page.getByRole('link', { name: /sign in/i }).first();
  await expect(signInLink).toBeVisible();
  await signInLink.click();

  // Verify navigation.
  await expect(page).toHaveURL(/\/login(?:\?|$)/);

  await expect(
    page.getByRole('heading', { name: /welcome back/i })
  ).toBeVisible();
});