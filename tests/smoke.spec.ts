import { test, expect } from '@playwright/test';
import { site } from '../src/data/site';

test.describe('home page smoke tests', () => {
  test('renders the hero, brand, and every service card', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/SMR Computer Services/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Computer & network help');

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

  test('links through to the UniFi service page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'More about UniFi network installs' }).click();
    await expect(page).toHaveURL(/\/unifi-network-installation$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'UniFi network installation'
    );
  });

  test('service card links through to the custom PC builds page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Learn more about Custom PC Builds' }).click();
    await expect(page).toHaveURL(/\/custom-pc-builds$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Custom PC builds');
  });

  test('service card links through to the websites page with client work', async ({ page }) => {
    await page.goto('/');

    await page
      .getByRole('link', { name: 'Learn more about Website Creation & Maintenance' })
      .click();
    await expect(page).toHaveURL(/\/website-design$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Small business websites');
    for (const client of ['Firenze Shoes', 'Whimsy Street Treats']) {
      await expect(page.getByRole('heading', { name: client })).toBeVisible();
    }
  });

  test('shows the contact section with the email call to action', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Have a project in mind?' })).toBeVisible();
    await expect(page.getByRole('link', { name: `Email ${site.email}` })).toHaveAttribute(
      'href',
      `mailto:${site.email}`
    );
  });
});
