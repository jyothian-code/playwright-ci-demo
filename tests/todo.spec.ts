import { test, expect } from '@playwright/test';

test('user can add and complete a task', async ({ page }) => {
  // 1. Open the application.
  await page.goto('/todomvc/');

  // 2. Add a task.
  const taskInput = page.getByPlaceholder('What needs to be done?');

  await taskInput.fill('Learn Playwright CI');
  await taskInput.press('Enter');

  // 3. Verify the task appears.
  const task = page
    .getByTestId('todo-item')
    .filter({ hasText: 'Learn Playwright CI' });

  await expect(task).toBeVisible();
  await expect(page.getByTestId('todo-count'))
    .toHaveText('1 item left');

  // 4. Complete the task.
  await task.getByRole('checkbox').check();

  // 5. Verify the outcome.
  await expect(task.getByRole('checkbox')).toBeChecked();
  await expect(page.getByTestId('todo-count'))
    .toHaveText('0 items left');
});