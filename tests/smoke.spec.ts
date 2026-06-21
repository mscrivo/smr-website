import { test, expect } from '@playwright/test';

test.describe('home page smoke tests', () => {
  test('renders the hero, brand, and every service card', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/SMR Computer Services/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Reliable tech help');

    // Logo loads in the header.
    await expect(page.locator('.brand img')).toBeVisible();

    // Every service from src/data/site.ts is rendered.
    for (const title of [
      'Custom PC Builds',
      'Network Installations & Upgrades',
      'Home & Business Surveillance',
      'Remote Support',
      'Website Creation & Maintenance',
      'Custom Small Business Software',
    ]) {
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    }
  });

  test('shows the contact section with the email call to action', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Have a project in mind?' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Email mscrivo@gmail\.com/ })).toHaveAttribute(
      'href',
      'mailto:mscrivo@gmail.com'
    );
  });
});
