/**
 * Code samples based on the LinkedIn Learning course 
 * "Selenium Essential Training" (Meaghan Lewis, 2020)
 * 
 * @author  Arturo Mora-Rioja
 * @version 1.0 December 2021
 */

class PageForm {
    constructor(webDriver, driverBy, driverKey) {
        this.driver = webDriver;
        this.By = driverBy;
        this.Key = driverKey;
    }

    async send(firstName, lastName, jobTitle, educationLevel, currentDate) {
    
        let radioButton;
        switch (educationLevel) {
            case 'High School': radioButton = 'radio-button-1';
            case 'College': radioButton = 'radio-button-2';
            case 'Grad School': radioButton = 'radio-button-3';
        }

        const txtFirstName = this.driver.findElement(this.By.id('first-name'));
        const txtLastName = this.driver.findElement(this.By.id('last-name'));
        const txtJobTitle = this.driver.findElement(this.By.id('job-title'));
        const radGradSchool = this.driver.findElement(this.By.id(radioButton));
        const chkMale = this.driver.findElement(this.By.id('checkbox-1'));
        const cmbExperience10 = this.driver.findElement(this.By.css('#select-menu > option[value="4"]'));
        const datPicker = this.driver.findElement(this.By.id('datepicker'));
        const btnSubmit = this.driver.findElement(this.By.css('a.btn.btn-lg.btn-primary'));
    
        await txtFirstName.sendKeys(firstName);
        await txtLastName.sendKeys(lastName);
        await txtJobTitle.sendKeys(jobTitle);
        await radGradSchool.click();
        await chkMale.click();
        await cmbExperience10.click();
        await datPicker.sendKeys(currentDate);
        await datPicker.sendKeys(this.Key.RETURN);
        // Form submission
        await btnSubmit.click();
    }
}

module.exports = PageForm;