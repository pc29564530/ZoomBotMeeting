const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('dotenv').config();
const emails = process.env.EMAIL;
const password = process.env.PASSWORD;
const option = new chrome.Options();

option.addArguments('--disable-default-apps');
option.addArguments('--disable-extensions');
option.addArguments('--disable-infobars');
option.setUserPreferences({
  credential_enable_service: false,
});

const driver = new Builder().forBrowser('chrome').setChromeOptions(option).build();

 async function browserFunction(link) {
    try {
      await driver.get('https://zoom.us/signin');
      await signInToZoom(driver);
      await joinMeetingsPage(driver,link);
    } catch(e) {
      console.log('An error occurred:', e.message);
    }
}

async function joinMeetingsPage(driver,link) {
  const url = link;
  const urlPart = url.split('/');
  const newUrl = 'https://us04web.zoom.us/j/' + urlPart[4];

  const regex = /\/j\/(\d+)/;
  const match = newUrl.match(regex);
  const meetingId = match ? match[1] : null;

  const part = url.split('?');
  const query = part[1];
  const queryPart = query.split('=');
  const passcode = queryPart[1];

  const joinUrl = 'https://us04web.zoom.us/wc/'+meetingId+'/join'
  await driver.get(joinUrl);
  

  await driver.sleep(5000);
  const meetingPass = await driver.findElement(By.id('input-for-pwd'));
  await meetingPass.sendKeys(passcode);
  
  const yourName = await driver.findElement(By.id('input-for-name'));
  await yourName.sendKeys('crazy coder');

  const join = await driver.findElement(By.css('#root > div > div.preview-new-flow > div > div.preview-meeting-info > button'));
  await join.click();
}

async function signInToZoom(driver) {
  try {
    const email = await driver.findElement(By.id('email'));
    await email.sendKeys(emails);

    const passwords = await driver.findElement(By.id('password'));
    await passwords.sendKeys(password);

    const submit = await driver.findElement(By.id('js_btn_login'));
    await submit.click();

    await driver.sleep(5000);

  } catch (err) {
    console.log('An error occurred:', err.message);
  }
}
module.exports = {browserFunction};
