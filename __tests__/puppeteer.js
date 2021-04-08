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