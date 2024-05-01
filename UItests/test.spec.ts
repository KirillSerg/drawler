import { test, expect, Page } from '@playwright/test';

test.describe('Setup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle("Drawler");
  });

  test('visible main page elements', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('id=canvas')).toBeVisible()
  });
});

test("Create rect", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const toolbarRect = page.locator('header > button > svg > rect')
  await toolbarRect.click()
  await page.mouse.move(500, 500);
  await page.mouse.down();
  await page.mouse.move(700, 700);
  await page.mouse.up();

  await checkElementInLocalStorage(page, "rect")

  // await page.pause()
})

async function checkElementInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction(t => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return JSON.parse(localStorage['elements']).map((el: any) => el.type).includes(t);
  }, title);
}



// let context;
// let page;

// test.beforeAll("BeforeAll", async ({ browser }) => {
//   context = await browser.newContext()
//   page = await context.newPage()
//   await page.goto('http://localhost:5173/');
// });

// test.afterAll("afterAll", async ({ browser }) => {
//   await context.close();
//   await browser.close();
// });