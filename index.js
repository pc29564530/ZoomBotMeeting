const { Builder, By, Alert } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const option = new chrome.Options();
option.addArguments('--disable-default-apps');
option.addArguments('--disable-extensions');
option.addArguments('--disable-infobars');
option.setUserPreferences({
  credential_enable_service: false,
});

const driver = new Builder().forBrowser('chrome').setChromeOptions(option).build();

async function openZoomMeetingsPage() {
  try {
    await driver.get('https://zoom.us/signin');
    await signInToZoom(driver);
    await joinMeetingsPage(driver);
    
    //https://us04web.zoom.us/j/72739743892?pwd=uoK80bQeiEHzch570c5m7yJawsMq1P.1#success

  } catch(e) {
    console.log('An error occurred:', e.message);
  }
}

async function joinMeetingsPage(driver) {
  const url = 'https://us04web.zoom.us/j/72739743892?pwd=uoK80bQeiEHzch570c5m7yJawsMq1P.1';
  const part = url.split('?');
  const query = part[1];
  const queryPart = query.split('=');
  const passcode = queryPart[1];
  // const urlPart = url.split('/');
  // const passcode = url.split('?');
  // const newUrl = 'https://us04web.zoom.us/j/' + urlPart;
  await driver.get('https://us04web.zoom.us/wc/72739743892/join');
  console.log(passcode);
  await driver.sleep(5000);
  const meetingPass = await driver.findElement(By.id('input-for-pwd'));
 // const meetingPass = await driver.findElement(By.css('#root > div > div.preview-new-flow > div > div.preview-meeting-info > div:nth-child(2) > label'));
  await meetingPass.sendKeys(passcode);
  
  const yourName = await driver.findElement(By.id('input-for-name'));
  await yourName.sendKeys('crazy coder');

  const join = await driver.findElement(By.css('#root > div > div.preview-new-flow > div > div.preview-meeting-info > button'));
  await join.click();
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
