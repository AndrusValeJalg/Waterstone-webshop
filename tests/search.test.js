const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

const TIMEOUT = 50000;

describe('Search and Filter Products on Waterstones Website', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await driver.get("https://www.waterstones.com/");
        await acceptCookies(driver);
    });

    test('Test Open Web Page', async () => {
        //Verify that the web page has a Waterstones title.
        let pageTitle = await driver.findElement(By.css("#main-logos > div > a.logo")).getText();
        expect(pageTitle).toBe("Waterstones");
    })
    
    test('Search for keyword “harry potter”', async () => {
        let searchField = await driver.findElement(By.className("input input-search"));
        searchField.click();
        searchField.sendKeys("harry potter");
        await driver.findElement(By.className("input-search-button icon")).click();
    });
    
    test('Sort searched items by relevance and then by price (high to low)', async () => {
        // Find the dropdown menu for sorting by class name
        const sortDropdown = await driver.findElement(By.className('fancy-select'));
        await sortDropdown.click();
    
        // Wait for the page to refresh or for the sorting to take effect
        await driver.sleep(2000); // Adjust the sleep time as needed
    
        // Now, find and click on the option for "Price (high to low)" by its text content
        const priceHighToLowOption = await driver.findElement(By.xpath('//option[text()="Price (high to low)"]'));
        await priceHighToLowOption.click();
    });
    
    
    
    test('Filter products by Format, select filter as “Hardback”', async () => {
        // Find the filter dropdown menu
        const filterDropdown = await driver.findElement(By.className('filter.js-filter'));
        filterDropdown.click();

        // Wait for the options to be visible
        await driver.wait(until.elementLocated(By.css('.filter-box.open')), 3000);

        // Find and click on the "Hardback" option
        const hardbackOption = await driver.findElement(By.xpath('//li[@data-label="Hardback"]'));
        await hardbackOption.click();

        // Apply the filter
        const applyFilterButton = await driver.findElement(By.className('apply-filters-button.js-apply-filters-button'));
        await applyFilterButton.click();
    });

});

async function acceptCookies(driver) {
    try {
        await driver.sleep(4000); // Wait for 4 seconds
        const cookieButton = await driver.wait(until.elementLocated(By.css("#onetrust-accept-btn-handler")), TIMEOUT);
        await driver.sleep(2000); // Additional delay to ensure the button is clickable
        await cookieButton.click(); // Click on the accept button
    } catch (error) {
        console.error("Failed to accept cookies:", error);
    }
}