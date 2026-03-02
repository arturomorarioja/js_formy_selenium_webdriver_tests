/**
 * Code samples based on the LinkedIn Learning course
 * "Selenium Essential Training" (Meaghan Lewis, 2020)
 *
 * @author  Arturo Mora-Rioja
 * @version 1.0.0 December 2021
 * @version 1.1.0 March 2026    Headless mode enabled
 *                              Heavy refactoring, including reinforcement of asynchronicity
 */

class PageForm {
    constructor(webDriver, driverBy, driverKey) {
        this.driver = webDriver;
        this.By = driverBy;
        this.Key = driverKey;
    }

    getEducationRadioButtonId(educationLevel) {
        switch (educationLevel) {
            case 'High School':
                return 'radio-button-1';
            case 'College':
                return 'radio-button-2';
            case 'Grad School':
                return 'radio-button-3';
            default:
                throw new Error(`Unsupported education level: ${educationLevel}`);
        }
    }

    async send(firstName, lastName, jobTitle, educationLevel, currentDate) {
        const radioButtonId = this.getEducationRadioButtonId(educationLevel);

        const txtFirstName = await this.driver.findElement(this.By.id('first-name'));
        const txtLastName = await this.driver.findElement(this.By.id('last-name'));
        const txtJobTitle = await this.driver.findElement(this.By.id('job-title'));
        const radEducation = await this.driver.findElement(this.By.id(radioButtonId));
        const chkMale = await this.driver.findElement(this.By.id('checkbox-1'));
        const cmbExperience10 = await this.driver.findElement(this.By.css('#select-menu > option[value="4"]'));
        const datPicker = await this.driver.findElement(this.By.id('datepicker'));
        const btnSubmit = await this.driver.findElement(this.By.css('a.btn.btn-lg.btn-primary'));

        await txtFirstName.sendKeys(firstName);
        await txtLastName.sendKeys(lastName);
        await txtJobTitle.sendKeys(jobTitle);
        await radEducation.click();
        await chkMale.click();
        await cmbExperience10.click();
        await datPicker.sendKeys(currentDate);
        await datPicker.sendKeys(this.Key.RETURN);
        // Form submission
        await btnSubmit.click();
    }
}

module.exports = PageForm;