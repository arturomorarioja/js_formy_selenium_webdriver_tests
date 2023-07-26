# Formy - Selenium WebDriver tests

## Purpose
Examples of Selenium WebDriver tests in JavaScript based on [Meaghan Lewis](http://meaghanlewis.com/)'s [Formy](https://formy-project.herokuapp.com/) webpage. 

`test-formy.js`

The following pages/elements are tested:
- Keypress
- Scroll
- Window tab switching
- Alert
- Drag and drop
- DatePicker
- Dropdown
- Dropdown without using the select option's ID property
- Form

`page-object-model\test-formy-pageobject.js`

The [Page Object Model](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/) design pattern is applied (check the files `page-form.js` and `page-confirmation.js`) and the form page is tested.

## Prerequisites
- Mozilla Firefox web browser
- NodeJS

## Instructions
- Formy tests
1. Open a console and run `node test-formy.js`
2. Expected output:
```
Form submitted
```
- Page Object Model
1. Open a console and run `node page-object-model\test-formy-pageobject.js`
2. Expected output:
```
Form submitted
```

## Tools
Selenium WebDriver / NodeJS / JavaScript / HTML5

## Author:
Arturo Mora-Rioja
Based on the LinkedIn Learning course [*Selenium Essential Training*](https://www.linkedin.com/learning/selenium-essential-training) ([Meaghan Lewis](http://meaghanlewis.com/), 2020)