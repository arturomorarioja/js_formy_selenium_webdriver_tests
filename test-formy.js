/**
 * Code samples based on the LinkedIn Learning course 
 * "Selenium Essential Training" (Meaghan Lewis, 2020)
 * 
 * @author  Arturo Mora-Rioja (amri@kea.dk)
 * @version 1.0 December 2021
 * @version 1.1 January 2023 testDropdownNoID() added
 */

const formy = 'https://formy-project.herokuapp.com/';
const {By, Key, Builder, until} = require('selenium-webdriver');
require('geckodriver');

async function testKeypress() {
    const text = 'KEA Development';
    const driver = await new Builder().forBrowser('firefox').build();
    
    await driver.get(formy + 'keypress');

    await driver.findElement(By.id('name')).sendKeys(text, Key.RETURN);
    await driver.findElement(By.id('name')).click();

    await driver.quit();
}

// Example of the Page Object Pattern
async function testScroll() {
    const text = 'KEA Development';
    const date = '15/07/2022';
    
    // Selector
    const driver = await new Builder().forBrowser('firefox').build();
    const txtName = driver.findElement(By.id('name'));
    const txtDate = driver.findElement(By.id('date'));
    
    // Methods
    await driver.get(formy + 'scroll');
    
    await driver.executeScript('document.getElementById("name").scrollIntoView()');
    await txtName.sendKeys(text);
    await txtDate.sendKeys(date);

    await driver.quit();
}

async function testWindow() {
    const driver = await new Builder().forBrowser('firefox').build();
    const btnNewTab = driver.findElement(By.id('new-tab-button'));

    await driver.get(formy + 'switch-window');    
    const hdlMainWindow = driver.getWindowHandle();

    // Open new tab
    await btnNewTab.click();

    // Switch to new tab
    const windowTabs = await driver.getAllWindowHandles();
    windowTabs.forEach(async function(hdlCurrentwindow) {
        if (hdlCurrentwindow !== hdlMainWindow) {
            await driver.switchTo().window(hdlCurrentwindow);
        }
    })

    // Switch back to original tab
    await driver.switchTo().window(hdlMainWindow);

    await driver.quit();
}

async function testAlert() {
    const driver = await new Builder().forBrowser('firefox').build();
    const btnAlert = driver.findElement(By.id('alert-button'));

    await driver.get(formy + 'switch-window');

    await btnAlert.click();                     // Show an alert
    const alert = driver.switchTo().alert();    // Capture the alert
    await alert.accept();                       // Accept the alert

    await driver.quit();
}

async function testDragAndDrop() {
    const driver = await new Builder().forBrowser('firefox').build();
    const imgSelenium = driver.findElement(By.id('image'));
    const divBox = driver.findElement(By.id('box'));

    await driver.get(formy + 'dragdrop');

    const actions = driver.actions({async: true});
    await actions.dragAndDrop(imgSelenium, divBox).perform();

    await driver.quit();
}

async function testDatePicker() {
    const driver = await new Builder().forBrowser('firefox').build();
    const datPicker = driver.findElement(By.id('datepicker'));

    await driver.get(formy + 'datepicker');

    // The datepicker must be closed after selecting the date,
    // hence the need to send the Return key
    await datPicker.sendKeys('03/03/2021');
    await datPicker.sendKeys(Key.RETURN);

    await driver.quit();
}

async function testDropdown() {
    const driver = await new Builder().forBrowser('firefox').build();
    const dropdownButton = driver.findElement(By.id('dropdownMenuButton'));
    const autocompleteOption = driver.findElement(By.id('autocomplete'));

    await driver.get(formy + 'dropdown');

    await dropdownButton.click();
    await autocompleteOption.click();

    await driver.quit();
}

async function testDropdownNoID() {
    const driver = await new Builder().forBrowser('firefox').build();
    const dropdownButton = driver.findElement(By.id('dropdownMenuButton'));
    const dropdownOptionsCSS = 'a.dropdown-item';
    const fileUploadOptionText = 'File Upload';
    
    await driver.get(formy + 'dropdown');
    
    await dropdownButton.click();
    const dropdownOptions = await driver.findElements(By.css(dropdownOptionsCSS));

    let optionText;
    for (const option of dropdownOptions) {
        optionText = await option.getText();
        if (optionText === fileUploadOptionText) {
            await option.click();
            break;
        }
    }
    
    await driver.quit();
}

async function testForm() {
    const firstName = 'Arturo';
    const lastName = 'Mora-Rioja';
    const jobTitle = 'Associate Professor';
    const currentDate = '01/02/2024';

    const cssDivSuccess = 'div.alert.alert-success';
    const textDivSuccess = 'The form was successfully submitted!';
    
    // Selector
    const driver = await new Builder().forBrowser('firefox').build();
    const txtFirstName = driver.findElement(By.id('first-name'));
    const txtLastName = driver.findElement(By.id('last-name'));
    const txtJobTitle = driver.findElement(By.id('job-title'));
    const radGradSchool = driver.findElement(By.id('radio-button-3'));
    const chkMale = driver.findElement(By.id('checkbox-1'));
    const cmbExperience10 = driver.findElement(By.css('#select-menu > option[value="4"]'));
    const datPicker = driver.findElement(By.id('datepicker'));
    const btnSubmit = driver.findElement(By.css('a.btn.btn-lg.btn-primary'));

    // Methods
    await driver.get(formy + 'form');

    await txtFirstName.sendKeys(firstName);
    await txtLastName.sendKeys(lastName);
    await txtJobTitle.sendKeys(jobTitle);
    await radGradSchool.click();
    await chkMale.click();
    await cmbExperience10.click();
    await datPicker.sendKeys(currentDate);
    await datPicker.sendKeys(Key.RETURN);
    // Form submission
    await btnSubmit.click();

    await driver.wait(until.elementLocated(By.css(cssDivSuccess)), 2000);
    const divSuccess = await driver.findElement(By.css(cssDivSuccess));
    // Assert simulation
    if (await divSuccess.getText() === textDivSuccess) {
        console.log('Form submitted');
    } else {
        console.log(`Error when submitting form. [${divSuccess.text}] is different than [${textDivSuccess}]`);
    }

    await driver.quit();
}

testKeypress();
testScroll();
testWindow();
testAlert();
testDragAndDrop();
testDatePicker();
testDropdown();
testDropdownNoID();
testForm();