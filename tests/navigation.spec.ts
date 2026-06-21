import { test, expect } from '@playwright/test';

test('desktop shows the primary nav links', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'desktop-only layout');

  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  for (const label of ['Services', 'About', 'Contact']) {
    await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
  }
  // Anchor nav scrolls to the contact section.
  await nav.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
});

test('mobile keeps the nav links reachable and the email CTA visible', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only layout');

  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary' });

  // The links wrap to a second row but stay visible and reachable on small screens.
  for (const label of ['Services', 'About', 'Contact']) {
    await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible();
  }

  // The "Get in touch" call to action stays available.
  await expect(page.getByRole('link', { name: 'Get in touch' })).toBeVisible();
});
