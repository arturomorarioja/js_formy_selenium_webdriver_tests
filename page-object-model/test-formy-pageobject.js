/**
 * Code samples based on the LinkedIn Learning course
 * "Selenium Essential Training" (Meaghan Lewis, 2020)
 *
 * @author  Arturo Mora-Rioja
 * @version 1.0.0 December 2021
 * @version 1.1.0 March 2026    Headless mode enabled
 *                              Heavy refactoring, including reinforcement of asynchronicity
 */

const formy = 'https://formy-project.herokuapp.com/';
const { By, Key, Builder, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

try {
    require('geckodriver');
} catch (err) {
    /* GeckoDriver can be resolved by Selenium Manager in Selenium 4+.
       This optional require is kept for setups that still rely on it. */
}

const PageForm = require('./page-form');
const PageConfirmation = require('./page-confirmation');

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

/**
 * Design Pattern: Page Object Model
 * It consists in instantiating one object per page
 */
async function testForm() {
    const driver = await createFirefoxDriver();

    try {
        await driver.get(formy + 'form');

        const form = new PageForm(driver, By, Key);
        const firstName = 'Arturo';
        const lastName = 'Mora-Rioja';
        const jobTitle = 'Associate Professor';
        const educationLevel = 'Grad School';
        const currentDate = '01/02/2024';

        await form.send(firstName, lastName, jobTitle, educationLevel, currentDate);

        const confirmation = new PageConfirmation(driver, By, until);

        // Assert simulation
        if (await confirmation.confirm()) {
            console.log('Form submitted');
        } else {
            console.log('Error when submitting form');
        }
    } finally {
        await driver.quit();
    }
}

testForm().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});