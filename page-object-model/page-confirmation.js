/**
 * Code samples based on the LinkedIn Learning course
 * "Selenium Essential Training" (Meaghan Lewis, 2020)
 *
 * @author  Arturo Mora-Rioja
 * @version 1.0.0 December 2021
 * @version 1.1.0 March 2026    Headless mode enabled
 *                              Heavy refactoring, including reinforcement of asynchronicity
 */

class PageConfirmation {
    constructor(webDriver, driverBy, driverUntil) {
        this.driver = webDriver;
        this.By = driverBy;
        this.until = driverUntil;
    }

    async confirm() {
        const cssDivSuccess = 'div.alert.alert-success';
        const textDivSuccess = 'The form was successfully submitted!';

        await this.driver.wait(this.until.elementLocated(this.By.css(cssDivSuccess)), 5000);
        const divSuccess = await this.driver.findElement(this.By.css(cssDivSuccess));

        return (await divSuccess.getText() === textDivSuccess);
    }
}

module.exports = PageConfirmation;