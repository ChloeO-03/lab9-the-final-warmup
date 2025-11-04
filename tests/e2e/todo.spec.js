import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('adds a todo', async ({ page }) => {
  await page.fill('input[type="text"]', 'Test Todo');
  await page.click('button:has-text("Add")');
  
  await expect(page.locator('.todo-text')).toContainText('Test Todo');
});

test('completes a todo', async ({ page }) => {
  await page.fill('input[type="text"]', 'Complete me');
  await page.click('button:has-text("Add")');
  
  await page.click('.checkbox');
  
  await expect(page.locator('.todo-text')).toHaveClass(/completed/);
});

test('deletes a todo', async ({ page }) => {
  await page.fill('input[type="text"]', 'Delete me');
  await page.click('button:has-text("Add")');
  
  page.on('dialog', dialog => dialog.accept());
  await page.click('.delete-btn');
  
  await expect(page.locator('.empty-state')).toBeVisible();
});

test('edits a todo', async ({ page }) => {
  await page.fill('input[type="text"]', 'Original');
  await page.click('button:has-text("Add")');
  
  await page.click('.edit-btn');
  await page.fill('.edit-input', 'Updated');
  await page.click('.save-btn');
  
  await expect(page.locator('.todo-text')).toContainText('Updated');
});

test('shows correct statistics', async ({ page }) => {
  await page.fill('input[type="text"]', 'Todo 1');
  await page.click('button:has-text("Add")');
  await page.fill('input[type="text"]', 'Todo 2');
  await page.click('button:has-text("Add")');
  
  await page.locator('.checkbox').first().click();
  
  const stats = await page.locator('.stat-value').allTextContents();
  expect(stats[0]).toBe('2'); // Total
  expect(stats[1]).toBe('1'); // Active
  expect(stats[2]).toBe('1'); // Completed
});

test('persists todos after reload', async ({ page }) => {
  await page.fill('input[type="text"]', 'Persistent');
  await page.click('button:has-text("Add")');
  
  await page.reload();
  
  await expect(page.locator('.todo-text')).toContainText('Persistent');
});