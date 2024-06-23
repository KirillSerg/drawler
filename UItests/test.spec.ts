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
})

test("Create triangle(polygon)", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const toolbarTriangle = page.locator('header > button > svg > polygon')
  await toolbarTriangle.click()
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.move(500, 500);
  await page.mouse.up();
  await checkElementInLocalStorage(page, "polygon")
  // drag&drop variant 1
  await page.mouse.down();
  await page.mouse.move(700, 400);
  await page.mouse.up();
  // delete element
  await page.press("id=canvas", "Delete")
  await checkNumberOfElementsInLocalStorage(page, 0)
})

test("Create text", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const toolbarText = page.locator('header > button > svg > text')
  await toolbarText.click()
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.move(500, 500);
  await page.mouse.up();
  await checkElementInLocalStorage(page, "foreignObject")
  // tap the text
  await page.locator("foreignObject > textarea").fill("I just type some text")
  // drag&drop variant 1
  await page.mouse.move(400, 400);
  await page.mouse.down();
  await page.mouse.move(700, 400);
  await page.mouse.up();
  // delete element
  await page.press("id=canvas", "Delete")
  await checkNumberOfElementsInLocalStorage(page, 0)
})

test("Create line", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const toolbarPencil = page.locator('header > button > [id=line]')
  await toolbarPencil.click()
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.move(500, 250);
  await page.mouse.up();
  await checkElementInLocalStorage(page, "line")
  // drag&drop variant 1
  await page.mouse.down();
  await page.mouse.move(700, 400);
  await page.mouse.up();
  // delete element
  await page.press("id=canvas", "Delete")
  await checkNumberOfElementsInLocalStorage(page, 0)
})

test("Create curved line", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const toolbarPencil = page.locator('header > button > [id=pencil]')
  await toolbarPencil.click()
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.move(305, 295);
  await page.mouse.move(310, 305);
  await page.mouse.move(312, 315);
  await page.mouse.move(305, 325);
  await page.mouse.move(300, 330);
  await page.mouse.move(300, 320);
  await page.mouse.move(305, 315);
  await page.mouse.move(310, 310);
  await page.mouse.move(315, 305);
  await page.mouse.move(320, 310);
  await page.mouse.up();
  await checkElementInLocalStorage(page, "path")
  // escape from pensil mode
  await page.press("id=canvas", "Escape")
  // drag&drop variant 1
  // moove to one pixel back to fix bug in firefox test
  await page.mouse.move(319, 309);
  await page.mouse.down();
  await page.mouse.move(700, 400);
  await page.mouse.up();
  // delete element
  await page.press("id=canvas", "Delete")
  await checkNumberOfElementsInLocalStorage(page, 0)
})

test("Zoom", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // zoom by clicking zoomBar
  const zoomDownBtn = page.locator('[id=zoomdown]')
  const zoomUpBtn = page.locator('[id=zoomup]')
  const zoomReset = page.locator('[id=zoomreset]')
  await zoomDownBtn.click()
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "width", value: 2112 }) //1920px+192px(10%)
  await zoomUpBtn.click()
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "percentage", value: 100 })
  await page.pause()
  // zoom by keyPress ctrl/meta + "+"/"-"
  await page.locator('#canvas').press('Control++')
  await page.keyboard.up("+")
  await page.keyboard.up("Control")
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "height", value: 972 }) //1080px - 108px(10%)
  await page.locator('#canvas').press('Meta+-')
  await page.keyboard.up("-")
  await page.keyboard.up("Meta")
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "percentage", value: 100 })
  // zoom by keyPress + wheel scroll
  await page.mouse.move(700, 400);
  await page.keyboard.down('Control')
  await page.mouse.wheel(0, 500);
  await page.keyboard.up("Control")
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "percentage", value: 90 })
  // reset zoom (centered)
  await zoomReset.click()
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "percentage", value: 100 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "width", value: 1920 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "height", value: 1080 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "x", value: 0 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "y", value: 0 })
})

test("Grab canvas", async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const zoomReset = page.locator('[id=zoomreset]')
  const toolbarGrab = page.locator('header > [id=canvasGrabBtn]')
  await toolbarGrab.click()
  // await page.locator('#canvas').click() // it's need if testing in --headed mode
  await page.mouse.move(600, 600);
  await page.mouse.down();
  await page.mouse.move(700, 700);
  await page.mouse.up();
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "x", value: -1 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "y", value: -1 })
  // reset grab (centered)
  await zoomReset.click()
  // await page.locator('#canvas').click()  // it's need if testing in --headed mode
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "percentage", value: 100 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "width", value: 1920 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "height", value: 1080 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "x", value: 0 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "y", value: 0 })
  // grab by keyPress + mouse move
  await page.mouse.move(600, 600);
  await page.keyboard.down('Control')
  await page.mouse.down();
  await page.mouse.move(400, 400);
  await page.mouse.up();
  await page.keyboard.up("Control")
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "x", value: 1 })
  await checkCanvasViewBoxParametersInLocalStorage(page, { key: "y", value: 1 })
})

test("Selecting frame", async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const toolbarRect = page.locator('header > button > svg > rect')
  await toolbarRect.click()
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.move(500, 500);
  await page.mouse.up();
  // check the frame and what it is visible
  await expect(page.locator('id=frame')).toBeVisible()
  // disable selecting of element
  await page.locator('#canvas').click()
  await expect(page.locator('id=frame')).toBeHidden()

  // resize
  // select element for the frame enable
  await page.mouse.move(300, 300);
  await page.mouse.down();
  await page.mouse.up();
  //get current haight
  const prevHaight = await page.evaluate(() => {
    const local = localStorage.getItem('elements');
    if (local) {
      return JSON.parse(local)[0].height
    }
  });
  await page.mouse.move(300, 297);
  await page.mouse.down();
  await page.mouse.move(300, 197);
  await page.mouse.up();
  //get haight after resizing
  const nextHaight = await page.evaluate(() => {
    const local = localStorage.getItem('elements');
    if (local) {
      return JSON.parse(local)[0].height
    }
  });
  expect(nextHaight).toBeGreaterThan(prevHaight)

  //multyselect
  // added one more element
  await toolbarRect.click()
  await page.mouse.move(100, 300);
  await page.mouse.down();
  await page.mouse.move(200, 400);
  await page.mouse.up();
  // select all two element by select area
  await page.mouse.move(1, 1);
  await page.mouse.down();
  await page.mouse.move(600, 600);
  await page.mouse.up();
  // check the numbers of frame and what it is visible
  const framesNumber = await page.locator('id=frame').count()
  expect(framesNumber).toBe(2)
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

async function checkCanvasViewBoxParametersInLocalStorage(page: Page, param: { key: string; value: number }) {
  return await page.waitForFunction(param => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (param.key === "x" || param.key === "y") {
      if (param.value <= 0) {
        return JSON.parse(localStorage['canvasViewBox'])[param.key] <= param.value;
      }
      if (param.value >= 0) {
        return JSON.parse(localStorage['canvasViewBox'])[param.key] >= param.value;
      }
    } else {
      return JSON.parse(localStorage['canvasViewBox'])[param.key] === param.value;
    }
  }, param);
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