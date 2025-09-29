/**
 * Code samples based on the LinkedIn Learning course 
 * "Selenium Essential Training" (Meaghan Lewis, 2020)
 * 
 * @author  Arturo Mora-Rioja
 * @version 1.0 December 2021
 */

const formy = 'https://formy-project.herokuapp.com/';
const {By, Key, Builder, until} = require('selenium-webdriver');
require('geckodriver');
const PageForm = require('./page-form');
const PageConfirmation = require('./page-confirmation');

/**
 * Design Pattern: Page Object Model
 * It consists in instantiating one object per page
 */
async function testForm() {
    const driver = await new Builder().forBrowser('firefox').build();

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
        // console.log(`Error when submitting form. [${divSuccess.text}] is different than [${textDivSuccess}]`);
        console.log(`Error when submitting form`);
    }

    await driver.quit();
}

testForm();