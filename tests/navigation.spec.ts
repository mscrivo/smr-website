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

test('mobile collapses the text links but keeps the email CTA', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only layout');

  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary' });

  // The plain text links are hidden on small screens.
  await expect(nav.getByRole('link', { name: 'Services', exact: true })).toBeHidden();

  // The "Get in touch" call to action stays available.
  await expect(nav.getByRole('link', { name: 'Get in touch' })).toBeVisible();
});
