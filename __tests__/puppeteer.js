// test for persistent data: emulating a fake user using the website
const puppeteer = require('puppeteer');
const assert = require('assert');

const server = 'http://localhost:8080/';

describe('Front-end Integration/Features', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(server);
  });

  afterAll((done) => {
    browser.close();
    done();
  });

  test('test home page url', async () => {
    const url = await page.url();
    assert(url === 'http://localhost:8080/');
  });
});
// describe('Initial display', () => {
//   it('loads successfully', async () => {
//     await page.goto(server);
//     await page.waitForSelector('.MuiBox-root MuiBox-root-30');
//     const span = await page.evaluate(
//       '.MuiBox-root MuiBox-root-30',
//       (el) => el.innerHTML
//     );
//     expect(span).toMatch('Product: Surgical Protective Visor');
//   });
// });

// const MaterialSelect = async (page, newSelectedValue, cssSelector) => {
//   await page.evaluate(
//     (newSelectedValue, cssSelector) => {
//       const clickEvent = document.createEvent('MouseEvents');
//       clickEvent.initEvent('mousedown', true, true);
//       const selectNode = document.querySelector(cssSelector);
//       selectNode.dispatchEvent(clickEvent);
//       [...document.querySelectorAll('li')]
//         .filter((el) => el.innerText == newSelectedValue)[0]
//         .click();
//     },
//     newSelectedValue,
//     cssSelector
//   );
// };
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(APP);
//   await MaterialSelect(page, 'new selected value', '#demo-simple-select');
// })();
// });

// 1 let browser; let page; // 2 beforeAll(async () => { browser = await puppeteer.launch({ headless: false }); page = await browser.newPage(); await page.goto("http://localhost:3000/"); }); // 3 test("renders learn react link", async () => { await page.waitForSelector(".App"); const header = await page.$eval(".App-header>p", e => e.innerHTML); expect(header).toBe(`Edit src/App.js and save to reload.`); const link = await page.$eval(".App-header>a", e => { return { innerHTML: e.innerHTML, href: e.href }; }); expect(link.innerHTML).toBe(`Learn React`); expect(link.href).toBe("https://reactjs.org/"); }); // 4 afterAll(() => { browser.close(); });

// await page.goto(APP);
// await page.evaluate(() => {
//   const span3 = document.querySelector(
//     'span[class="MuiBox-root MuiBox-root-30"]'
//   ).innerText;

//   return { span3 };
// });
