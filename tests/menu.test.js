const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

const TIMEOUT = 50000;

describe('Navigate Waterstones Website', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();

        await driver.get("https://www.waterstones.com/");
        await acceptCookies(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Test Open Web Page', async () => {
        const pageTitle = await driver.getTitle();
        expect(pageTitle).toContain("Waterstones");
    });
    
    test('Test Click on “See More” button', async () => {
        let seeMoreButton = await driver.findElement(By.css('header.pages-header-row a.button.button-teal'));
        await seeMoreButton.click();
    });
    
    
    test('Test Click on “Business, Finance & Law” filter', async () => {
        const businessFinanceLawFilter = await driver.findElement(By.linkText("Business, Finance & Law"));
        await businessFinanceLawFilter.click();
    });
    
    
    test('Test Click on “Accounting” filter', async () => {
        const accountingFilter = await driver.findElement(By.linkText("Accounting"));
        await accountingFilter.click();
    });
    
    
    
    
    test('Test Click on “Cost Accounting” filter', async () => {
        const costAccountingFilter = await driver.findElement(By.linkText("Cost Accounting"));
        await costAccountingFilter.click();
    });
    
    
});

async function acceptCookies(driver) {
    try {
        await driver.sleep(8000); // Wait for 15 seconds
        const cookieButton = await driver.wait(until.elementLocated(By.css("#onetrust-accept-btn-handler")), TIMEOUT);
        await driver.sleep(2000); // Additional delay to ensure the button is clickable
        await cookieButton.click(); // Click on the accept button
    } catch (error) {
        console.error("Failed to accept cookies:", error);
    }
}