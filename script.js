const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const scr = '/tmp/scr.png'
  const start = 'https://app.yinxiang.com/api/DeveloperToken.action'
  const wait_options = {
    waitUntil: 'networkidle0'
  }

  const page = await browser.newPage();

  await page.goto(start, wait_options)

  await page.type('#username', process.env.username)
  await page.click('#loginButton')
  // console.log(1)
  await page.screenshot({
    path: '/tmp/scr1.png'
  });

  await page.type('#password', process.env.password)
  const aaa = await Promise.all([
    page.waitForNavigation(wait_options),
    page.click('#loginButton')
  ]);
  console.log("login")
  // await page.screenshot({path: '/tmp/scr2.png'});

  const button_revoke = await page.evaluate(() => {
    return document.querySelector('input[name=remove]').value
  })
  console.log(button_revoke)

  await Promise.all([
    page.waitForNavigation(wait_options),
    page.click('input[name=remove]')
  ]);
  console.log("revoke")
  await page.screenshot({
    path: '/tmp/scr3.png'
  });


  await Promise.all([
    page.waitForNavigation(wait_options),
    page.click('input[name=create]')
  ]);
  // await page.click('input[name=create]')
  console.log("create")
  await page.screenshot({
    path: '/tmp/scr4.png'
  });

  const token_info = await page.evaluate(() => {
    return document.querySelector('#token').value + "\n" +
      document.querySelector('h3:last-of-type + br').nextSibling.nodeValue.trim() + "\n" +
      "ok"
  })
  console.log(token_info)

  await browser.close()

  fs.unlinkSync('/tmp/scr1.png')
  fs.unlinkSync('/tmp/scr3.png')
  fs.unlinkSync('/tmp/scr4.png')
})();