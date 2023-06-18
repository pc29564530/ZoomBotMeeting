const { Builder, By, Alert } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const option = new chrome.Options();
option.addArguments('--disable-default-apps');
option.addArguments('disable-infobars')
const driver = new Builder().forBrowser('chrome').setChromeOptions(option).build();

async function openZoomMeetingsPage() {
  try {
    await driver.get('https://zoom.us/signin');
    await signInToZoom(driver);
    await joinMeetingsPage(driver);
    
  } catch(e) {
    console.log('An error occurred:', e.message);
  }
}

async function joinMeetingsPage(driver) {
  const url = 'https://us04web.zoom.us/j/72739743892?pwd=uoK80bQeiEHzch570c5m7yJawsMq1P.1';
  const urlPart = url.split('/');
  const newUrl = 'https://us04web.zoom.us/j/' + urlPart;
  await driver.get(url);
  await checkPopup(driver);
  // const launchButton = await driver.findElement(By.className('mbTuDeF1'));
  // await launchButton.click();
}

async function checkPopup(driver) {
  try {
    await driver.findElement(By.id('alert')).click();
    await driver.switchTo().alert().dismiss();
  } catch (e) {
    console.log('no alert found', e);
  }
 
}

async function signInToZoom(driver) {
  try {
    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('codecrazy21@gmail.com');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('nMjKEVrSixkV6R7');

    const submitButton = await driver.findElement(By.id('js_btn_login'));
    await submitButton.click();

    await driver.sleep(5000);

  } catch (err) {
    console.log('An error occurred:', err.message);
  }
}

openZoomMeetingsPage();
