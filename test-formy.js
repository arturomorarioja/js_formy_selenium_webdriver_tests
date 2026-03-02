/**
 * Code samples based on the LinkedIn Learning course 
 * "Selenium Essential Training" (Meaghan Lewis, 2020)
 * 
 * @author  Arturo Mora-Rioja
 * @version 1.0.0 December 2021
 * @version 1.1.0 January 2023   testDropdownNoID() added
 * @version 1.1.1 September 2025 KEA replaced by EK in test data
 * @version 1.2.0 March 2026     Headless mode enabled
 *                               Heavy refactoring, including reinforcement of asynchronicity
 */

const formy = 'https://formy-project.herokuapp.com/';
const {By, Key, Builder, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

try {
    require('geckodriver');
} catch (err) {
    /* GeckoDriver can be resolved by Selenium Manager in Selenium 4+.
       This optional require is kept for setups that still rely on it. */
}

function createFirefoxDriver() {
    const options = new firefox.Options();

    if (process.argv.includes('--headless')) {
        options.addArguments('-headless');
        options.addArguments('--width=1920');
        options.addArguments('--height=1080');
    }

    return new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();
}

async function testKeypress() {
    const text = 'EK Development';
    const driver = await createFirefoxDriver();
    
    try {
        await driver.get(formy + 'keypress');
        
        const txtName = await driver.findElement(By.id('name'));
        await txtName.sendKeys(text, Key.RETURN);
        await txtName.click();
    } finally {       
        await driver.quit();
    }
}

// Example of the Page Object Pattern
async function testScroll() {
    const text = 'EK Development';
    const date = '15/07/2022';
    const driver = await createFirefoxDriver();
    
    // Selector
    try {
        const txtName = driver.findElement(By.id('name'));
        const txtDate = driver.findElement(By.id('date'));
        
        // Methods
        await driver.get(formy + 'scroll');
        
        await driver.executeScript('document.getElementById("name").scrollIntoView()');
        await txtName.sendKeys(text);
        await txtDate.sendKeys(date);
    } finally {        
        await driver.quit();
    }
}

async function testWindow() {
    const driver = await createFirefoxDriver();
    try {
        await driver.get(formy + 'switch-window');    
        
        const btnNewTab = driver.findElement(By.id('new-tab-button'));
        const hdlMainWindow = driver.getWindowHandle();
        
        // Open new tab
        await btnNewTab.click();
        
        // Switch to new tab
        const windowTabs = await driver.getAllWindowHandles();
        for (const hdlCurrentwindow of windowTabs) {
            if (hdlCurrentwindow !== hdlMainWindow) {
                await driver.switchTo().window(hdlCurrentwindow);
                break;
            }
        }
        
        // Switch back to original tab
        await driver.switchTo().window(hdlMainWindow);    
    } finally {
        await driver.quit();
    }
}

async function testAlert() {
    const driver = await createFirefoxDriver();
    try {        
        await driver.get(formy + 'switch-window');
        
        const btnAlert = await driver.findElement(By.id('alert-button'));
        await btnAlert.click();                         // Show an alert

        const alert = await driver.switchTo().alert();  // Capture the alert
        await alert.accept();                           // Accept the alert
    } finally {       
        await driver.quit();
    }
}

async function testDragAndDrop() {
    const driver = await createFirefoxDriver();
    try {
        await driver.get(formy + 'dragdrop');

        const imgSelenium = await driver.findElement(By.id('image'));
        const divBox = await driver.findElement(By.id('box'));
                
        const actions = driver.actions({async: true});
        await actions.dragAndDrop(imgSelenium, divBox).perform();
    } finally {        
        await driver.quit();
    }
}

async function testDatePicker() {
    const driver = await createFirefoxDriver();
    try {
        await driver.get(formy + 'datepicker');
        
        const datPicker = await driver.findElement(By.id('datepicker'));
                
        // The datepicker must be closed after selecting the date,
        // hence the need to send the Return key
        await datPicker.sendKeys('03/03/2021');
        await datPicker.sendKeys(Key.RETURN);
    } finally {        
        await driver.quit();
    }
}

async function testDropdown() {
    const driver = await createFirefoxDriver();
    try {
        await driver.get(formy + 'dropdown');

        const dropdownButton = await driver.findElement(By.id('dropdownMenuButton'));
        await dropdownButton.click();
        
        const autocompleteOption = await driver.findElement(By.id('autocomplete'));              
        await autocompleteOption.click();
    } finally {        
        await driver.quit();
    }
}

async function testDropdownNoID() {
    const driver = await createFirefoxDriver();
    try {
        await driver.get(formy + 'dropdown');

        const dropdownButton = await driver.findElement(By.id('dropdownMenuButton'));
        await dropdownButton.click();

        const dropdownOptionsCSS = 'a.dropdown-item';
        const fileUploadOptionText = 'File Upload';
                
        const dropdownOptions = await driver.findElements(By.css(dropdownOptionsCSS));
        
        for (const option of dropdownOptions) {
            const optionText = await option.getText();
            if (optionText === fileUploadOptionText) {
                await option.click();
                break;
            }
        }        
    } finally {
        await driver.quit();
    }
}

async function testForm() {
    const firstName = 'Arturo';
    const lastName = 'Mora-Rioja';
    const jobTitle = 'Associate Professor';
    const currentDate = '2/3/2026';

    const cssDivSuccess = 'div.alert.alert-success';
    const textDivSuccess = 'The form was successfully submitted!';
    
    // Selector
    const driver = await createFirefoxDriver();
    try {
        await driver.get(formy + 'form');

        const txtFirstName = await driver.findElement(By.id('first-name'));
        const txtLastName = await driver.findElement(By.id('last-name'));
        const txtJobTitle = await driver.findElement(By.id('job-title'));
        const radGradSchool = await driver.findElement(By.id('radio-button-3'));
        const chkMale = await driver.findElement(By.id('checkbox-1'));
        const cmbExperience10 = await driver.findElement(By.css('#select-menu > option[value="4"]'));
        const datPicker = await driver.findElement(By.id('datepicker'));
        const btnSubmit = await driver.findElement(By.css('a.btn.btn-lg.btn-primary'));
        
        // Methods        
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
        
        await driver.wait(until.elementLocated(By.css(cssDivSuccess)), 5000);
        const divSuccess = await driver.findElement(By.css(cssDivSuccess));
        
        // Assert simulation
        const actualText = await divSuccess.getText();
        if (actualText === textDivSuccess) {
            console.log('Form submitted');
        } else {
            console.log(`Error when submitting form. [${actualText}] is different than [${textDivSuccess}]`);
        }
    } finally {
        await driver.quit();
    }
}

async function main() {
    await testKeypress();
    await testScroll();
    await testWindow();
    await testAlert();
    await testDragAndDrop();
    await testDatePicker();
    await testDropdown();
    await testDropdownNoID();
    await testForm();
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});