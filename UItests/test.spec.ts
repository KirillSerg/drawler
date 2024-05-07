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
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.move(500, 500);
  await page.mouse.up();
  await checkElementInLocalStorage(page, "rect")
  // drag&drop variant 1
  await page.mouse.down();
  await page.mouse.move(700, 400);
  await page.mouse.up();
  // drag&drop variant 2 -- not work becase of header height
  // await page.dragAndDrop('id=canvas', 'id=canvas', {
  //   sourcePosition: { x: 700, y: 400 },
  //   targetPosition: { x: 100, y: 500 },
  // });

  // delete element
  await page.press("id=canvas", "Delete")
  await checkNumberOfElementsInLocalStorage(page, 0)
  await page.pause()
})

async function checkElementInLocalStorage(page: Page, elementType: string) {
  return await page.waitForFunction(type => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return JSON.parse(localStorage['elements']).map((el: any) => el.type).includes(type);
  }, elementType);
}

async function checkNumberOfElementsInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return JSON.parse(localStorage['elements']).length === e;
  }, expected);
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

// await page.pause()